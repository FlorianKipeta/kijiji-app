<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WebhookVerificationController extends Controller
{
    public function __invoke(Request $request)
    {
        if ($request->input('hub_mode') === 'subscribe' && $request->input('hub_verify_token') === config('webhook-client.configs.0.signing_secret')) {
            return response($request->input('hub_challenge'), 200);
        }

        return response('Forbidden', 403);
    }
}
