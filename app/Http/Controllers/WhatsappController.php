<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Project;
use App\Models\WhatsappAccount;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class WhatsappController extends Controller
{
    public function store(Request $request, Project $project): RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'values.phone_number_id' => 'required|string',
            'values.waba_id'         => 'required|string',
            'values.business_id'     => 'required|string',
            'code.authResponse.code' => 'required|string',
            'code.status'            => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->with('error', $validator->errors()->first());
        }

        $validated = $validator->validated();

        $appId     = config('services.facebook.app_id');
        $appSecret = config('services.facebook.app_secret');
        $redirect  = config('services.facebook.redirect_uri');

        $code = $validated['code']['authResponse']['code'];

        // Call Facebook OAuth API to get access token
        $response = Http::get('https://graph.facebook.com/v23.0/oauth/access_token', [
            'client_id'     => $appId,
            'redirect_uri'  => $redirect,
            'client_secret' => $appSecret,
            'code'          => $code,
        ]);

        if ($response->failed()) {
            return redirect()->back()
                ->with('error', 'Failed to retrieve access token from Facebook.');
        }

        $data = $response->json();
        $accessToken = $data['access_token'] ?? null;

        if (! $accessToken) {
            return redirect()->back()
                ->with('error', 'No access token returned from Facebook.');
        }

        // Save WhatsApp account with access token
        $project->whatsappAccount()->updateOrCreate([
            'phone_number_id' => $validated['values']['phone_number_id'],
            'waba_id'         => $validated['values']['waba_id'],
            'business_id'     => $validated['values']['business_id'],
            'code'            => $code,
            'status'          => $validated['code']['status'],
            'access_token'    => $accessToken, // ✅ make sure your DB table has this column
        ]);

        return redirect()->back()->with('success', 'WhatsApp account connected successfully!');
    }

    public function destroy(WhatsappAccount $whatsappAccount): RedirectResponse
    {

        $whatsappAccount->delete();

        return redirect()->back()->with('success', 'Account deleted successfully');
    }
}
