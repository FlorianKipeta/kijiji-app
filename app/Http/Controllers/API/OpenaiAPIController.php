<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\OpenaiResource;
use App\Models\Openai;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class OpenaiAPIController extends Controller
{
    public function __invoke(Request $request): OpenaiResource
    {
        abort_unless(auth()->user()->hasRole('Super Admin') || auth()->user()->hasAnyPermission('view openai'), 403);


        $openai = Openai::query()->first();

        return new OpenaiResource($openai);
    }
}
