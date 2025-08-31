<?php

namespace App\Notifications;

use App\Models\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewCommunicationNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Message $message)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {

        return (new MailMessage)
            ->subject('New Communication from '.$this->message->customer->name)
            ->line('A new message has been sent by '.$this->message->customer->name.'.')
            ->line('Message Content: '.$this->message->text)
            ->action('Respond to the Message', route('chats'))
            ->line('Please respond at your earliest convenience.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'New Communication from '.$this->message->customer->name,
            'message' => 'Hello, You have received a new message from our valued customer '.$this->message->customer->name.'.',
            'url' => route('chats'),
        ];
    }
}
