<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AccountUpdatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected string $name;

    protected string $email;

    protected string $password;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $name, string $email, string $password)
    {
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
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
            ->subject('Kijiji AI - New Password')
            ->greeting('Hello '.$this->name)
            ->line('Your account for the Kijiji AI has been updated.')
            ->line('You can use the following credentials to log in:')
            ->line('Email: '.$this->email)
            ->line('Password: '.$this->password) // Provide the actual password here
            ->action('Login Now', $loginLink)
            ->line('Thank you for using our system!');
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
