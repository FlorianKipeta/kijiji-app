<?php

namespace App\Http\Controllers;

use App\Models\Openai;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class OpenaiController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        $openai = Openai::query()->first();

        return inertia('Openai/Index', ['openai' => $openai, 'openai_key' => '*********']);
    }
}
