<?php

namespace App\Services;

use Illuminate\Http\Request;
use Spatie\WebhookClient\SignatureValidator\SignatureValidator;

class WhatsAppSignatureValidator implements SignatureValidator
{
    public function isValid(Request $request, \Spatie\WebhookClient\WebhookConfig $config): bool
    {
//        return true;
                $signingSecret = $config->signingSecret;

                $expectedSignatureHeader = $config->signatureHeaderName;
                $signature = $request->header($expectedSignatureHeader);

                if (! $signature) {
                    return false;
                }

                $computedSignature = 'sha256=' . hash_hmac('sha256', $request->getContent(), $signingSecret);

                return hash_equals($signature, $computedSignature);
    }
}
