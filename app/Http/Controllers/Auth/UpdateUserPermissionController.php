<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UpdateUserPermissionController extends Controller
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
            'permissions' => ['array', 'nullable', 'present'],
        ]);

        $user->syncPermissions($request->permissions ?: []);

        return back()->with('success', 'permissions updated');
    }
}
