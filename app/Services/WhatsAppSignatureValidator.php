<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Support\Facades\Http;

class WhatsAppService
{
    public static function sendWhatsAppMessage(Project $project, string $phone, string $message): void
    {
        Http::withHeaders([
            'Authorization' => 'Bearer '.$project->whatsappAccount->code,
            'Content-Type' => 'application/json',
        ])
            ->post('https://graph.facebook.com/v23.0/'.$project->whatsappAccount->phone_number_id.'/messages',
                array_merge([
                    'type' => 'text',
                    'text' => ['body' => $message, 'preview_url' => false],
                ],
                    ['messaging_product' => 'whatsapp', 'recipient_type' => 'individual',
                        'to' => str_replace('+', '', $phone),
                    ]));
    }
}
