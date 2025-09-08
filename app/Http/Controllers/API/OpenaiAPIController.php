<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\OpenaiResource;
use App\Models\OpenAIConfig;
use Illuminate\Http\Request;

class OpenaiAPIController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): OpenaiResource
    {
        abort_unless(
            auth()->user()->hasRole('Super Admin') || auth()->user()->hasAnyPermission('view openai'),
            403,
            'Unauthorized access.'
        );

        $openai = OpenAIConfig::first();

        return new OpenaiResource($openai);
    }
}
