<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChatResource;
use App\Models\Customer;
use Illuminate\Http\Request;

class ProfileAPIController extends Controller
{
    public function __invoke(Request $request, Customer $customer): ChatResource
    {
        abort_unless(auth()->user()->hasRole('Super Admin') || auth()->user()->hasAnyPermission('view customers'), 403);

        return new ChatResource($customer);
    }
}
