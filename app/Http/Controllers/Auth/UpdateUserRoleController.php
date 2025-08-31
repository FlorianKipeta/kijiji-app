<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UpdateUserRoleController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, User $user)
    {
        abort_if(auth()->user()->cannot('edit users'), 403);

        abort_if(auth()->user()->id === $user->id, 403, 'role assignment to self is forbiden');

        $request->validate([
            'roles' => ['array', 'present', 'nullable'],
        ]);

        $user->syncRoles($request->roles ?: []);

        return back()->with('success', 'User roles updated');
    }
}
