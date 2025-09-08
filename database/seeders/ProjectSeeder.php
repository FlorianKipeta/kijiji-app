<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Project::query()->create([
            'name' => 'Kilimo Kiganjani',
            'slug' => 'kilimo-kiganjani',
            'purpose' => 'The official AI-powered assistant of the Ministry of Agriculture – Tanzania.',
        ]);
    }
}
