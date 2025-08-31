<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class MustChangePassword
{
    public function handle(Request $request, Closure $next)
    {
        if (
            (auth()->user() && auth()->user()->must_change_password) &&
            ! $request->routeIs('api.*', 'notifications', 'users.reset-password')
        ) {
            return inertia('Profile/ChangePassword');
        }

        return $next($request);
    }
}
