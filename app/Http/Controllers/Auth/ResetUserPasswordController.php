<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\AccountUpdatedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ResetUserPasswordController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, User $user)
    {
        abort_if(auth()->user()->cannot('edit users'), 403);

        $request->validate([
            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],
        ]);

        $user->forceFill([
            'password' => Hash::make($request->password),
            'must_change_password' => true,
        ])->save();

        $user->notify(new AccountUpdatedNotification($user->name, $user->email, $request->password));

        return back()->with('success', 'User password has been reseted');
    }
}
