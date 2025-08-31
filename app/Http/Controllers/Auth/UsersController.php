<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UsersController extends Controller
{
    //
    public function index(Request $request)
    {
        abort_if(auth()->user()->cannot('view users'), 403);

        $roles = RoleResource::collection(Role::withCount(['permissions'])->get());

        return inertia('UserManagement/Users/Index', ['canEditUser' => auth()->user()->can('edit users'), 'users' => UserResource::collection(User::all()), 'roles' => $roles]);
    }

    public function edit(User $user)
    {
        abort_if(auth()->user()->cannot('edit users'), 403);

        $user->load('roles', 'permissions');

        $user = new UserResource($user);

        return inertia('UserManagement/Users/Edit', [
            'user_info' => $user,
            'permissions' => Permission::all(),
            'roles' => Role::all(),
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'role_id' => 'required|exists:roles,id',
        ]);

        $user = User::create([
            'name' => strtoupper($request->name),
            'email' => $request->email,
            'password' => Hash::make('Enhance@1357'),
            'must_change_password' => true,
        ]);

        if ($request->has('role_id') && $request->role_id !== null) {
            $user->assignRole(Role::findById($request->role_id));
        }

        event(new Registered($user));

        // Auth::login($user);

        return back()->with('success', 'User created');
    }
}
