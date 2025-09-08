<?php

namespace App\Http\Controllers;

use App\Http\Resources\WhatsappAccountResource;
use App\Models\WhatsappAccount;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rule;
use Inertia\Response;
use Inertia\ResponseFactory;

class WhatsappAccountController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        abort_if(auth()->user()->cannot('view whatsapp accounts'), 403);

        return inertia('WhatsappAccount/Index', [
            'canCreate' => auth()->user()->can('create whatsapp accounts'),
            'canEdit' => auth()->user()->can('edit whatsapp accounts'),
            'canDelete' => auth()->user()->can('delete whatsapp accounts'),
            'canAssign' => auth()->user()->can('add whatsappAccount to groups'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        abort_if(auth()->user()->cannot('create whatsapp accounts'), 403);

        $data = $request->validate([
            'app_id' => ['required', 'string', 'max:255', 'unique:whatsapp_accounts'],
            'phone_number_id' => ['required', 'string', 'max:255', 'unique:whatsapp_accounts'],
            'business_account_id' => ['required', 'string', 'max:255', 'unique:whatsapp_accounts'],
            'access_token' => [
                'required',
                'string',
                'unique:whatsapp_accounts',
                function ($attribute, $value, $fail) use ($request) {
                    if (! $this->isValidAccessToken($value, $request->phone_number_id)) {
                        $fail("The $attribute is not valid for the given phone number.");
                    }
                },
            ],
        ]);

        $whatsappAccount = WhatsappAccount::query()->create($data);

        return back()->with('success', 'WhatsappAccount created successfully');
    }

    protected function isValidAccessToken(string $accessToken, string $phoneNumberID): bool
    {
        $response = Http::withHeaders(['Authorization' => 'Bearer '.$accessToken, 'Content-Type' => 'application/json'])->get('https://graph.facebook.com/v23.0/' . $phoneNumberID . '/whatsapp_business_profile?fields=about,address,description,email,profile_picture_url,websites,vertical',[
            'messaging_product' => 'whatsapp',
        ]);

        if ($response->successful()) {
            return true;
        }
        return false;

    }

    public function show(WhatsappAccount $whatsappAccount): Response|ResponseFactory
    {
        abort_if(auth()->user()->cannot('view whatsapp accounts'), 403);

        return inertia('WhatsappAccount/Show', [
            'canCreateFile' => auth()->user()->can('create file'),
            'canDeleteFile' => auth()->user()->can('delete file'),
            'whatsappAccount' => new WhatsappAccountResource($whatsappAccount->load('creator', 'whatsappAccount')),
        ]);
    }

    public function update(Request $request, WhatsappAccount $whatsappAccount): RedirectResponse
    {
        abort_if(auth()->user()->cannot('update whatsapp accounts'), 403);


        $data = $request->validate([
            'app_id' => [
                'required',
                'string',
                'max:255',
                Rule::unique('whatsapp_accounts')->ignore($whatsappAccount->id),
            ],
            'phone_number_id' => [
                'required',
                'string',
                'max:255',
                Rule::unique('whatsapp_accounts')->ignore($whatsappAccount->id),
            ],
            'business_account_id' => [
                'required',
                'string',
                'max:255',
                Rule::unique('whatsapp_accounts')->ignore($whatsappAccount->id),
            ],
            'access_token' => [
                'required',
                'string',
                Rule::unique('whatsapp_accounts')->ignore($whatsappAccount->id),
                function ($attribute, $value, $fail) use ($request) {
                    if (! $this->isValidAccessToken($value, $request->phone_number_id)) {
                        $fail("The $attribute is not valid for the given phone number.");
                    }
                },
            ],
        ]);


        $whatsappAccount->update($data);

        return back()->with('success', 'WhatsappAccount updated successfully');
    }

    public function destroy(WhatsappAccount $whatsappAccount): RedirectResponse
    {
        abort_if(auth()->user()->cannot('delete whatsapp accounts'), 403);

        $whatsappAccount->delete();

        return back()->with('success', 'WhatsappAccount deleted successfully');
    }
}
