<?php

namespace App\Listeners;

use App\Events\TenderUpdated;
use App\Models\NotificationSetting;
use App\Notifications\TenderUpdateMail;
use Illuminate\Support\Facades\Notification;

class SendTenderUpdatesNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(TenderUpdated $event): void
    {
        $emailsSetting = NotificationSetting::query()
            ->where('name', NotificationSetting::TENDER_UPDATES_MAIL_LIST)
            ->first();

        if (! $emailsSetting || empty($emailsSetting->value)) {
            return;
        }

        $emails = is_array($emailsSetting->value) ? $emailsSetting->value : [$emailsSetting->value];

        Notification::route('mail', $emails)
            ->notify(new TenderUpdateMail($event->tender, $event->note));
    }
}
