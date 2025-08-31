<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoleResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\Permission\Models\Role;

class RoleAPIController extends Controller
{
    public function __invoke(): AnonymousResourceCollection
    {
        return RoleResource::collection(Role::query()->where('id', '!=', 1)->get());
    }
}
