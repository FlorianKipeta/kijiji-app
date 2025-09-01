<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;

class PermissionTableSeeder extends Seeder
{
    /**
     * List of permissions
     */
    private const PERMISSIONS = [
        ['name' => 'view dashboard', 'module' => 'Dashboard'],

        ['name' => 'view users', 'module' => 'User Management'],
        ['name' => 'edit users', 'module' => 'User Management'],
        ['name' => 'delete users', 'module' => 'User Management'],
        ['name' => 'view roles', 'module' => 'User Management'],
        ['name' => 'create roles', 'module' => 'User Management'],
        ['name' => 'edit roles', 'module' => 'User Management'],
        ['name' => 'delete roles', 'module' => 'User Management'],
        ['name' => 'view user settings', 'module' => 'User Management'],
        ['name' => 'manage user settings', 'module' => 'User Management'],

        ['name' => 'view projects', 'module' => 'Projects'],
        ['name' => 'create projects', 'module' => 'Projects'],
        ['name' => 'edit projects', 'module' => 'Projects'],
        ['name' => 'delete projects', 'module' => 'Projects'],

    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $columns = $this->prepareColumns();
        $existing_permissions = Permission::query()
            ->get();

        $not_seeded = collect($columns)
            ->filter(
                fn ($row) => ! $existing_permissions->contains(fn ($perm) => $perm->name === $row['name'])
            );

        DB::table('permissions')->insert($not_seeded->toArray());
    }

    /**
     * Prepares array of data columns with to insert in database
     */
    private function prepareColumns(): array
    {
        return array_map(fn ($permision) => [
            'name' => $permision['name'],
            'module' => $permision['module'],
            'guard_name' => 'web',
            'created_at' => now(),
            'updated_at' => now(),
        ], self::PERMISSIONS);
    }
}
