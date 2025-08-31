<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class NotificationAPIController extends Controller
{
    public function index(): JsonResponse
    {
        $user = auth()->user();

        $notifications = $user->unreadNotifications;

        $notifications = $notifications->map(function ($item) {
            $item->fromNow = $item->created_at->diffForHumans(['options' => Carbon::JUST_NOW | Carbon::ONE_DAY_WORDS | Carbon::TWO_DAY_WORDS]);

            return $item;
        });

        return response()->json($notifications);
    }

    public function markAsRead(Request $request): Response
    {
        $user = auth()->user();

        $user
            ->unreadNotifications
            ->where('id', $request->id)
            ->markAsRead();

        return response()->noContent();
    }

    public function markAllAsRead(): Response
    {
        $user = auth()->user();

        $user
            ->unreadNotifications
            ->markAsRead();

        return response()->noContent();
    }
}
