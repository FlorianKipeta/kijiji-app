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

        ['name' => 'view openai', 'module' => 'Open AI'],
        ['name' => 'update openai', 'module' => 'Open AI'],

        ['name' => 'view whatsapp accounts', 'module' => 'WhatsApp Accounts'],
        ['name' => 'create whatsapp accounts', 'module' => 'WhatsApp Accounts'],
        ['name' => 'edit whatsapp accounts', 'module' => 'WhatsApp Accounts'],
        ['name' => 'delete whatsapp accounts', 'module' => 'WhatsApp Accounts'],

        ['name' => 'view projects', 'module' => 'Projects'],
        ['name' => 'create projects', 'module' => 'Projects'],
        ['name' => 'edit projects', 'module' => 'Projects'],
        ['name' => 'delete projects', 'module' => 'Projects'],

        ['name' => 'view customers', 'module' => 'Customers'],
        ['name' => 'create customers', 'module' => 'Customers'],
        ['name' => 'edit customers', 'module' => 'Customers'],
        ['name' => 'delete customers', 'module' => 'Customers'],

        ['name' => 'view files', 'module' => 'Files'],
        ['name' => 'create files', 'module' => 'Files'],
        ['name' => 'delete files', 'module' => 'Files'],

        ['name' => 'view websites', 'module' => 'Website Links'],
        ['name' => 'create websites', 'module' => 'Website Links'],
        ['name' => 'delete websites', 'module' => 'Website Links'],

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
