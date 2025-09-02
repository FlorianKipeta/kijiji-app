<?php

namespace App\Jobs;

use App\Actions\GetCustomerLocation;
use App\Events\CustomerCreated;
use App\Models\Customer;
use App\Models\Message;
use App\Models\Project;
use App\Models\WhatsappAccount;
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

        $whatsAppAccount = WhatsAppAccount::query()->where('phone_number_id', $phoneNumberID)->first();
        if ( $whatsAppAccount) {
            $project = $whatsAppAccount->project;

            $customer = $this->getOrCreateCustomer($contacts, $message);

            if ($message) {
                $this->handleMessage($project, $customer, $message);
            }
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
                'location' => (new GetCustomerLocation)->execute($customerWhatsappID),
                'created_by' => 1,
            ]
        );
    }

    private function handleMessage(Project $project, Customer $customer, array $message): void
    {
        $messageType = $message['type'] ?? null;

        if (! $messageType) {
            throw new \InvalidArgumentException('Message type is missing');
        }

        $this->processMessageType($messageType, $message, $customer, $project);
    }

    private function processMessageType(string $messageType, array $message, Customer $customer, Project $project): void
    {
        match ($messageType) {
            Message::TEXT_MESSAGE => $this->createTextMessage($project, $customer, $message['text']['body'], $message['id']),
            Message::BUTTON_MESSAGE => $this->createTextMessage($project, $customer, $message['button']['text'], $message['id']),
            Message::IMAGE_MESSAGE, Message::AUDIO_MESSAGE, Message::VIDEO_MESSAGE, Message::DOCUMENT_MESSAGE, Message::STICKER_MESSAGE => $this->processMediaMessage($project, $message, $customer),
            default => throw new \InvalidArgumentException('Unknown message type: ' . $messageType),
        };
    }

    private function createTextMessage(Project $project, Customer $customer, string $text, string $messageID): void
    {
        $message = Message::query()->create([
            'type' => 'text',
            'text' => $text,
            'message_id' => $messageID,
            'customer_id' => $customer->id,
            'timestamp' => strtotime('now'),
            'status' => 'sent',
        ]);

        $this->continueConversation($project, $customer, $message);
    }

    private function processMediaMessage(Project $project, Customer $customer, array $message): void
    {
        //
    }



    private function continueConversation(Project $project, Customer $customer, Message $message): void
    {
        WhatsAppService::sendWhatsAppMessage($project, $customer,$message);
    }
}
