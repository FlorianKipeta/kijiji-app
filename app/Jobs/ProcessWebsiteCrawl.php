<?php

namespace App\Jobs;

use App\CrawlObservers\PlainTextCrawlObserver;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Spatie\Crawler\Crawler;

class ProcessWebsiteCrawl implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /** @var string The URL to crawl. */
    protected string $url;

    /**
     * Create a new job instance.
     *
     * @param  string  $url  The URL to crawl.
     */
    public function __construct(string $url)
    {
        $this->url = $url;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $filename = 'crawled_content.txt';

        // Clear the file before starting the crawl.
        Storage::put($filename, "Crawl of {$this->url}\n\n".str_repeat('=', 50)."\n\n");

        Crawler::create()
            ->setCrawlObserver(new PlainTextCrawlObserver($this->url))
            ->setMaximumDepth(2)
            ->setTotalCrawlLimit(50)
            ->ignoreRobots()
            ->setParseableMimeTypes(['text/html'])
            ->setConcurrency(2)
            ->startCrawling($this->url);
    }
}
