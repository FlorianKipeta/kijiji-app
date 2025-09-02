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
            'values.waba_id' => 'required|string',
            'values.business_id' => 'required|string',
            'code.authResponse.code' => 'required|string',
            'code.status' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->with('error', $validator->errors()->first());
        }

        $validated = $validator->validated();

        $appId = config('services.facebook.app_id');
        $appSecret = config('services.facebook.app_secret');
        $redirect = config('services.facebook.redirect_uri');

        $code = $validated['code']['authResponse']['code'];

        // Call Facebook OAuth API to get access token
        $phoneNumbersResponse = Http::get('https://graph.facebook.com/v23.0/oauth/access_token', [
            'client_id' => $appId,
            'redirect_uri' => $redirect,
            'client_secret' => $appSecret,
            'code' => $code,
        ]);

        if ($phoneNumbersResponse->failed()) {
            return redirect()->back()
                ->with('error', 'Failed to retrieve access token from Facebook.');
        }

        $data = $phoneNumbersResponse->json();
        $accessToken = $data['access_token'] ?? null;

        if (!$accessToken) {
            return redirect()->back()
                ->with('error', 'No access token returned from Facebook.');
        }

        $phoneNumberID = $validated['values']['phone_number_id'];
        $wabaID = $validated['values']['waba_id'];

        $register = Http::get('https://graph.facebook.com/v23.0/' . $phoneNumberID . '/register', [
            'messaging_product' => "whatsapp",
            'pin' => "123456"
        ]);

        if ($register->failed()) {
            return redirect()->back()
                ->with('error', 'Failed to register account.');
        }

        $phoneNumbersResponse = Http::withToken($accessToken)
            ->get("https://graph.facebook.com/v23.0/{$wabaID}/phone_numbers");

        $phoneNumbersData = $phoneNumbersResponse->json('data');

        if (!empty($phoneNumbersData)) {
            $phoneNumber = $phoneNumbersData[0];

            $project->whatsappAccount()->updateOrCreate(
                ['project_id' => $project->id],
                [
                    'phone_number_id' => $phoneNumberID,
                    'waba_id'         => $wabaID,
                    'business_id'     => $validated['values']['business_id'],
                    'code'            => $code,
                    'status'          => $validated['code']['status'],
                    'access_token'    => $accessToken,
                    'display_phone_number' => $phoneNumber['display_phone_number'],
                    'verified_name'        => $phoneNumber['verified_name'],
                    'platform_type'        => $phoneNumber['platform_type'],
                ]
            );
        }

        return redirect()->back()->with('success', 'WhatsApp account connected successfully!');
    }

    public function destroy(WhatsappAccount $whatsappAccount): RedirectResponse
    {

        $whatsappAccount->delete();

        return redirect()->back()->with('success', 'Account deleted successfully');
    }
}
