<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesController extends Controller
{
    public function index()
    {
        abort_if(auth()->user()->cannot('view roles'), 403);

        // without this eager loading spatie users throws error
        // config(['auth.guards.sanctum.provider' => 'users']);

        $roles = RoleResource::collection(Role::withCount(['permissions'])->get());

        return inertia('UserManagement/Roles/Index', [
            'roles' => $roles,
            'canCreateRoles' => auth()->user()->can('create roles'),
            'canEditRoles' => auth()->user()->can('edit roles'),
            'canDeleteRoles' => auth()->user()->can('delete roles'),
        ]);
    }

    public function create()
    {
        abort_if(auth()->user()->cannot('create roles'), 403);

        return inertia('UserManagement/Roles/Create', [
            'permissions' => Permission::all(),
        ]);
    }

    public function store(Request $request)
    {
        abort_if(auth()->user()->cannot('create roles'), 403);

        $request->validate([
            'name' => ['required', 'string', 'max:150', Rule::unique('roles', 'name')],
            'permissions' => ['present', 'array'],
        ]);

        DB::transaction(function () use ($request) {
            $role = Role::create([
                'name' => $request->name,
                'guard_name' => 'web',
            ]);

            $role->syncPermissions($request->permissions);
        });

        return redirect(route('roles.index'))->with('success', 'Role created successfull');
    }

    public function edit(Role $role)
    {
        abort_if(auth()->user()->cannot('edit roles'), 403);

        $role->load('permissions');

        return inertia('UserManagement/Roles/Edit', [
            'permissions' => Permission::all(),
            'role' => new RoleResource($role),
        ]);
    }

    public function update(Request $request, Role $role)
    {
        abort_if(auth()->user()->cannot('edit roles'), 403);

        $request->validate([
            'name' => [
                'required',
                'string',
                'max:150',
                Rule::unique('roles', 'name')->ignore($role->id),
            ],
            'permissions' => ['present', 'array'],
        ]);

        if ($role->name === 'Super Admin') {
            return back()->with('message', 'Role cannot be edited');
        }

        $role->name = $request->name;

        $role->isDirty() ? $role->save() : null;

        $role->syncPermissions($request->permissions);

        return redirect(route('roles.index'))->with('success', 'Role Updated');
    }

    public function destroy(Role $role)
    {
        abort_if(auth()->user()->cannot('delete roles'), 403);

        if ($role->name === 'Super Admin') {
            return back()->with('message', 'Super Admin cannot be deleted');
        }

        $role_users_count = $role->users()->count();

        if ($role_users_count > 0) {
            return back()->with('message', 'Permissions is assigned to users, it cannot be deleted');
        }

        $role->delete();

        return back()->with('success', 'Role deleted');
    }
}
