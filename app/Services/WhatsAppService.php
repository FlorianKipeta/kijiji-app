<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\Message;
use App\Models\OpenAIConfig;
use App\Models\WhatsappAccount;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use OpenAI;

class WhatsAppService
{
    public static function sendWhatsAppMessage(Customer $customer, Message $message, $phoneNumberID): void
    {
        $openAIConfig = self::getOpenAIConfig();
        if (! $openAIConfig) {
            Log::warning('OpenAI config not found, skipping WhatsApp message.');
            return;
        }

        try {
            $responseText = self::generateAIResponse($openAIConfig, $message->text);

            if (empty($responseText)) {
                Log::warning('OpenAI returned empty response, skipping WhatsApp message.', ['message' => $message->text]);
                return;
            }

            self::sendMessageToWhatsApp($customer, $responseText, $phoneNumberID);

        } catch (\Throwable $e) {
            Log::error('Error sending WhatsApp message', [
                'error' => $e->getMessage(),
                'customer' => $customer->id,
            ]);
        }
    }

    /**
     * Fetch OpenAI configuration from the database
     */
    protected static function getOpenAIConfig(): ?OpenAIConfig
    {
        return OpenAIConfig::query()->first();
    }

    /**
     * Generate response from OpenAI using the customer message
     */
    protected static function generateAIResponse(OpenAIConfig $config, string $userMessage): string
    {
        $openAIClient = OpenAI::client($config->key);

        $response = $openAIClient->responses()->create([
            'model' => $config->model,
            'tools' => [[
                'type' => 'file_search',
                'vector_store_ids' => [$config->vector_store],
                'max_num_results' => 20,
            ]],
            'input' => [
                ['role' => 'system', 'content' => $config->instructions],
                ['role' => 'user', 'content' => $userMessage],
            ],
            'max_output_tokens' => $config->max_tokens,
            'temperature' => $config->temperature,
        ]);

        return $response->outputText ?? '';
    }

    /**
     * Send message to WhatsApp API
     */
    protected static function sendMessageToWhatsApp(Customer $customer, string $messageText, $phoneNumberID): void
    {
        // Fetch WhatsApp account configuration
        $whatsAppConfig = WhatsappAccount::query()
            ->where('phone_number_id', $phoneNumberID)
            ->first();

        if (! $whatsAppConfig) {
            Log::warning('WhatsApp account configuration not found.', ['phone_number_id' => $phoneNumberID]);
            return;
        }

        $token = 'Bearer ' . $whatsAppConfig->access_token;
        $endpoint = config('services.whatsapp.api_endpoint');

        $cleanPhone = preg_replace('/\+/', '', $customer->phone);
        if (empty($cleanPhone)) {
            Log::warning('Invalid customer phone number, cannot send WhatsApp message.', ['customer_id' => $customer->id]);
            return;
        }

        Log::debug('Sending WhatsApp message', [
            'endpoint' => $endpoint,
            'to' => $cleanPhone,
            'message_preview' => substr($messageText, 0, 50) . '...'
        ]);

        try {
            $response = Http::withHeaders([
                'Authorization' => $token,
                'Content-Type' => 'application/json',
            ])->post($endpoint, [
                'messaging_product' => 'whatsapp',
                'recipient_type' => 'individual',
                'type' => 'text',
                'to' => $cleanPhone,
                'text' => [
                    'body' => $messageText,
                    'preview_url' => false,
                ],
            ]);

            if ($response->successful()) {
                Log::info('WhatsApp message sent successfully.', ['customer_id' => $customer->id]);
            } else {
                Log::error('Failed to send WhatsApp message.', [
                    'customer_id' => $customer->id,
                    'status' => $response->status(),
                    'response' => $response->body(),
                ]);
            }
        } catch (\Throwable $e) {
            Log::error('Exception while sending WhatsApp message.', [
                'customer_id' => $customer->id,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
