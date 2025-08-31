<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(PermissionTableSeeder::class);

        DB::table('roles')->insert([
            'name' => 'Super Admin',
            'guard_name' => 'web',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $user = User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@kijiji.co.tz',
        ]);

        $user->assignRole('Super Admin');

    }
}
