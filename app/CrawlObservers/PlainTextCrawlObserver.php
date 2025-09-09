<?php

namespace App\CrawlObservers;

use App\Models\OpenAIConfig;
use App\Models\Website;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use OpenAI;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\UriInterface;
use Spatie\Browsershot\Browsershot;
use Spatie\Crawler\CrawlObservers\CrawlObserver;
use Symfony\Component\DomCrawler\Crawler;
use Throwable;

class PlainTextCrawlObserver extends CrawlObserver
{
    protected string $filename;

    protected array $renderedUrls = [];

    public function __construct(string $url)
    {
        $host = parse_url($url, PHP_URL_HOST) ?? 'site';
        $host = str_replace([':', '/'], '_', $host);

        $this->filename = "private/project_files/{$host}.txt";

        Storage::put($this->filename, "=== Cloned site from {$url} ===\n\n");
    }

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

            $crawler = new Crawler($html);

            $content = [];

            $crawler->filter('h1, h2, h3, h4, h5, h6, p, li, span, div, table tr, th, td, article, section, header, footer, nav, main')->each(function (Crawler $node) use (&$content) {
                $text = trim($node->text());
                if ($text) {
                    $content[] = $text;
                }
            });

            $plainText = implode("\n", $content);

            if (! empty($plainText)) {
                Storage::append(
                    $this->filename,
                    "URL: {$urlStr}\n\n{$plainText}\n\n".str_repeat('-', 50)."\n\n"
                );
            }
        } catch (Throwable $e) {
            Log::error("Crawler: Failed to parse {$urlStr}. Reason: ".$e->getMessage());
        }
    }

    public function finishedCrawling(): void
    {
        $absolutePath = storage_path("app/private/{$this->filename}");
        $text = Storage::get($this->filename);

        $openAiFile = $this->uploadFileToVectorStore($absolutePath);

        Website::query()->create([
            'name' => str_replace('.txt', '', basename($this->filename)),
            'path' => $absolutePath,
            'file_id' => $openAiFile,
            'size' => strlen($text),
            'created_by' => auth()->id() ?? 1,
        ]);

        Log::info("Crawler: Finished and exported {$this->filename}");
    }

    protected function uploadFileToVectorStore(string $path): string
    {
        $openAIConfig = OpenAIConfig::query()->first();
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

    public function crawlFailed(UriInterface $url, Throwable $reason, ?UriInterface $foundOnUrl = null, ?string $linkText = null): void
    {
        Log::warning("Crawler: Crawl failed for URL: {$url}. Reason: ".$reason->getMessage());

        Storage::append('private/project_files/failed_urls.txt', (string) $url);

    }
}
