<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CustomerAPIController extends Controller
{
    public function __invoke(Request $request): AnonymousResourceCollection
    {
        abort_unless(auth()->user()->hasRole('Super Admin') || auth()->user()->hasAnyPermission('view customers'), 403);

        $request->validate([
            'page_size' => ['integer'],
            'paginate' => ['boolean'],
            'startDate' => ['date', 'nullable', 'date_format:Y-m-d'],
            'endDate' => ['date', 'nullable', 'date_format:Y-m-d'],
        ]);

        $customers = Customer::query()
            ->latest('id')
            ->when(
                $request->has('startDate') && $request->has('endDate'),
                fn ($query) => $query->whereBetween('created_at', [Carbon::parse($request->startDate)->startOfDay(), Carbon::parse($request->endDate)->startOfDay()->endOfDay()])
            )
            ->when($request->q, fn ($query) => $query->search($request->q));

        return CustomerResource::collection(
            $request->paginate ?
                $customers->paginate($request->page_size ?? 100) :
                $customers->limit($request->page_size ?? 100)->get()
        );
    }
}
