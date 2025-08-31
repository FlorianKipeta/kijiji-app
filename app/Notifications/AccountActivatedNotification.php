<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AccountActivatedNotification extends Notification
{
    use Queueable;

    protected User $user;

    /**
     * Create a new notification instance.
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $loginLink = url('/login'); // Replace this with the actual login link

        return (new MailMessage)
            ->subject('Enhance CHAT - Account Activated')
            ->greeting('Hello '.$this->user->name)
            ->line('Your account for the Enhance Auto CHAT has been activated.')
            ->line('You can use the following credentials to log in:')
            ->line('Email: '.$this->user->email)
            ->line('Password: Enhance@1357')
            ->action('Login Now', $loginLink)
            ->line('Thank you for using our System!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
