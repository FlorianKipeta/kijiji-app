<?php

namespace App\Http\Controllers;
use Inertia\Response;
use Inertia\ResponseFactory;

class DashboardController extends Controller
{
    public function __invoke(): Response|ResponseFactory
    {
        return inertia('Dashboard');
    }
}
