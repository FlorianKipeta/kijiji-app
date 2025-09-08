<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\WhatsappAccountResource;
use App\Models\WhatsappAccount;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class WhatsappAccountAPIController extends Controller
{
    public function __invoke(Request $request): AnonymousResourceCollection
    {
        abort_unless(auth()->user()->hasRole('Super Admin') || auth()->user()->hasAnyPermission('view whatsapp accounts'), 403);

        $request->validate([
            'page_size' => ['integer'],
            'paginate' => ['boolean'],
            'startDate' => ['date', 'nullable', 'date_format:Y-m-d'],
            'endDate' => ['date', 'nullable', 'date_format:Y-m-d'],
        ]);

        $whatsappAccounts = WhatsappAccount::query()
            ->latest('id')
            ->when(
                $request->has('startDate') && $request->has('endDate'),
                fn ($query) => $query->whereBetween('created_at', [Carbon::parse($request->startDate)->startOfDay(), Carbon::parse($request->endDate)->startOfDay()->endOfDay()])
            )
            ->when($request->q, fn ($query) => $query->search($request->q));

        return WhatsappAccountResource::collection(
            $request->paginate ?
                $whatsappAccounts->paginate($request->page_size ?? 100) :
                $whatsappAccounts->limit($request->page_size ?? 100)->get()
        );
    }
}
