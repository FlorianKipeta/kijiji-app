<?php

namespace App\CrawlObservers;

use App\Models\OpenaiConfig;
use App\Models\Website;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use OpenAI;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\UriInterface;
use Spatie\Browsershot\Browsershot;
use Spatie\Crawler\CrawlObservers\CrawlObserver;
use Throwable;

class PlainTextCrawlObserver extends CrawlObserver
{
    /** @var string The name of the output file. */
    protected string $filename;

    /** @var array A list of URLs that have already been processed to prevent duplicates. */
    protected array $renderedUrls = [];

    public function __construct(string $url)
    {
        // build safe filename like example.com.txt
        $host = parse_url($url, PHP_URL_HOST) ?? 'site';
        $host = str_replace([':', '/'], '_', $host);

        $this->filename = "private/project_files/{$host}.txt";

        // create/overwrite the file with header
        Storage::put($this->filename, "=== Cloned site from {$url} ===\n\n");
    }

    /**
     * Called when a new page has been crawled.
     *
     * @param  UriInterface  $url  The URI of the page that was crawled.
     * @param  ResponseInterface  $response  The response from the crawl.
     * @param  UriInterface|null  $foundOnUrl  The URI where this link was found.
     * @param  string|null  $linkText  The text of the link.
     */
    public function crawled(
        UriInterface $url,
        ResponseInterface $response,
        ?UriInterface $foundOnUrl = null,
        ?string $linkText = null
    ): void {
        $urlStr = (string) $url;

        if (in_array($urlStr, $this->renderedUrls)) {
            return;
        }
        $this->renderedUrls[] = $urlStr;

        try {
            try {
                $html = Browsershot::url($urlStr)
                    ->timeout(60)
                    ->bodyHtml();
            } catch (Throwable $e) {
                $html = (string) $response->getBody();
            }

            $plainText = strip_tags($html);
            $plainText = preg_replace('/\s+/', ' ', $plainText);
            $plainText = trim($plainText);

            if (! empty($plainText)) {
                Storage::append(
                    $this->filename,
                    "URL: {$urlStr}\n\n{$plainText}\n\n".str_repeat('-', 50)."\n\n"
                );
            }
        } catch (Throwable $e) {
            // log error
        }
    }

    /**
     * Called when the crawl has finished.
     */
    public function finishedCrawling(): void
    {
        $absolutePath = storage_path("app/{$this->filename}");

        $text = Storage::get($this->filename);

        $openAiFile = $this->uploadFileToVectorStore($absolutePath);

        Website::query()->create([
            'name' => basename($this->filename),
            'path' => $absolutePath,
            'file_id' => $openAiFile,
            'size' => strlen($text),
            'created_by' => auth()->id() ?? 1,
        ]);

        \Log::info("Crawler: Finished and exported {$this->filename}");
    }

    protected function uploadFileToVectorStore(string $path): string
    {
        $openAIConfig = OpenaiConfig::query()->first();

        if (! $openAIConfig) {
            return 'No OpenAI configuration found.';
        }
        $openAIClient = OpenAI::client($openAIConfig->key);

        $response = $openAIClient->files()->upload([
            'file' => fopen($path, 'r'),
            'purpose' => 'assistants',
        ]);

        $openAIClient->vectorStores()->files()->create($openAIConfig->vector_store, [
            'file_id' => $response->id,
        ]);

        return $response->id;
    }

    /**
     * Called when the crawl for a specific URL failed.
     *
     * @param  UriInterface  $url  The URL that failed to crawl.
     * @param  Throwable  $reason  The reason for the failure.
     * @param  UriInterface|null  $foundOnUrl  The URL where this link was found.
     * @param  string|null  $linkText  The text of the link.
     */
    public function crawlFailed(UriInterface $url, Throwable $reason, ?UriInterface $foundOnUrl = null, ?string $linkText = null): void
    {
        Log::error("Crawler: Crawl failed for URL: {$url}. Reason: ".$reason->getMessage());
    }
}
