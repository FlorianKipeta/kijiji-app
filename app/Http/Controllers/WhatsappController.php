<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Project;
use App\Models\WhatsappAccount;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WhatsappController extends Controller
{
    public function store(Request $request, Project $project)
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
                ->with('success', $validator->errors()->first());
        }

        $validated = $validator->validated();

        $project->whatsappAccounts()->create([
            'phone_number_id' => $validated['values']['phone_number_id'],
            'waba_id'        => $validated['values']['waba_id'],
            'business_id'    => $validated['values']['business_id'],
            'code'           => $validated['code']['authResponse']['code'],
            'status'         => $validated['code']['status'],
        ]);

        return redirect()->back()->with('success', 'WhatsApp account saved successfully!');
    }

    public function destroy(WhatsappAccount $whatsappAccount): RedirectResponse
    {

        $whatsappAccount->delete();

        return redirect()->back()->with('success', 'Account deleted successfully');
    }
}
