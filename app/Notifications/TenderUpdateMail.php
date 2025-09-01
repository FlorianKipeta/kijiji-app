<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TenderUpdateMail extends Notification
{
    use Queueable;

    public $tender;

    public $note;

    public function __construct($tender, $note)
    {
        $this->tender = $tender;
        $this->note = $note;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        $mail = (new MailMessage)
            ->subject('Tender Updated')
            ->line("A new note has been added to tender: **{$this->tender->title}**")
            ->line("**Note:** {$this->note->message}");

        if ($this->note->document) {
            //            $mail->action('View Attachment', url("/documents/{$this->note->document->id}/view"));
        }

        $mail->action('View Tender', route('tenders.show', $this->tender->id));

        return $mail;
    }
}
