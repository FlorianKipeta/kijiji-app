<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\Message;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    public static function sendWhatsAppMessage(Customer $customer, Message $message): void
    {

        $res = OpenAI::responses()->create([
            'model' => $project->model,
            'tools' => [[
                'type' => 'file_search',
                'vector_store_ids' => [$project->vector_store],
                'max_num_results' => 20,
            ]],
            'input' => [
                [
                    'role' => 'system',
                    'content' => $project->instructions,
                ],
                [
                    'role' => 'user',
                    'content' => $message->text,
                ],
            ],
            'max_output_tokens' => 500,
            'temperature' => 0.7,
        ]);

        $token = 'Bearer '.config('services.whatsapp.token');
        $endpoint = config('services.whatsapp.api_endpoint');
        Log::debug('Response: ', [$res]);
        Log::debug('Env values: ', ['endpoint' => $endpoint, 'token' => $token]);

        Http::withHeaders([
            'Authorization' => $token,
            'Content-Type' => 'application/json',
        ])
            ->post($endpoint,
                [
                    'type' => 'text',
                    'text' => ['body' => $res->outputText, 'preview_url' => false],
                    'messaging_product' => 'whatsapp', 'recipient_type' => 'individual',
                    'to' => str_replace('+', '', $customer->phone),
                ]);
    }
}
