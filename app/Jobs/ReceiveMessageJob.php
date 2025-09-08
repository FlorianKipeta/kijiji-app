<?php

namespace App\Jobs;

use App\Actions\GetCustomerLocation;
use App\Models\Customer;
use App\Models\Message;
use App\Services\WhatsAppService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Spatie\WebhookClient\Jobs\ProcessWebhookJob;

class ReceiveMessageJob extends ProcessWebhookJob
{
    public function handle(): void
    {
        $payload = $this->webhookCall->payload;

        Log::debug('Payload received:', [json_encode($payload)]);

        try {
            DB::transaction(fn () => $this->processPayload($payload));
        } catch (\Throwable $e) {
            Log::error('Error processing payload: '.$e->getMessage(), ['payload' => $payload]);
        }
    }

    private function processPayload(array $payload): void
    {
        $data = $payload['entry'][0];
        $validatedData = $data['changes'][0]['value'];
        $contacts = $validatedData['contacts'] ?? null;
        $message = $validatedData['messages'][0] ?? null;
        $phoneNumberID = $validatedData['metadata']['phone_number_id'] ?? null;

        $customer = $this->getOrCreateCustomer($contacts, $message);

        if ($message) {
            $this->handleMessage($customer, $message, $phoneNumberID);
        }
    }

    private function getOrCreateCustomer(?array $contacts, ?array $message): Customer
    {
        $customerName = $contacts[0]['profile']['name'] ?? $message['from'] ?? 'No name';
        $customerWhatsappID = $contacts[0]['wa_id'] ?? $message['from'];

        return Customer::query()->firstOrCreate(
            ['phone' => $customerWhatsappID],
            [
                'name' => $customerName,
                'country' => (new GetCustomerLocation)->execute($customerWhatsappID),
            ]
        );
    }

    private function handleMessage(Customer $customer, array $message, $phoneNumberID): void
    {
        $messageType = $message['type'] ?? null;

        if (! $messageType) {
            throw new \InvalidArgumentException('Message type is missing');
        }

        $this->processMessageType($messageType, $message, $customer,$phoneNumberID);
    }

    private function processMessageType(string $messageType, array $message, Customer $customer,$phoneNumberID): void
    {
        match ($messageType) {
            Message::TEXT_MESSAGE => $this->createTextMessage($customer, $message['text']['body'], $message['id'],$phoneNumberID),
            Message::BUTTON_MESSAGE => $this->createTextMessage($customer, $message['button']['text'], $message['id'],$phoneNumberID),
            Message::IMAGE_MESSAGE, Message::AUDIO_MESSAGE, Message::VIDEO_MESSAGE, Message::DOCUMENT_MESSAGE => $this->processMediaMessage($customer, $message,$phoneNumberID),
            default => throw new \InvalidArgumentException('Unknown message type: '.$messageType),
        };
    }

    private function createTextMessage(Customer $customer, string $text, string $messageID,$phoneNumberID): void
    {
        $message = Message::query()->create([
            'type' => 'text',
            'text' => $text,
            'message_id' => $messageID,
            'customer_id' => $customer->id,
            'timestamp' => strtotime('now'),
            'status' => 'sent',
        ]);

        $this->continueConversation($customer, $message, $phoneNumberID);
    }

    private function processMediaMessage(Customer $customer, array $message,$phoneNumberID): void
    {
        //
    }

    private function continueConversation(Customer $customer, Message $message, $phoneNumberID): void
    {
        WhatsAppService::sendWhatsAppMessage($customer, $message,$phoneNumberID);
    }
}
