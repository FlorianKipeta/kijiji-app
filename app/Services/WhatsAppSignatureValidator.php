<?php

namespace App\Services;

use Illuminate\Http\Request;
use Spatie\WebhookClient\SignatureValidator\SignatureValidator;

class WhatsAppSignatureValidator implements SignatureValidator
{
    public function isValid(Request $request, \Spatie\WebhookClient\WebhookConfig $config): bool
    {
        return true;
    }
}
