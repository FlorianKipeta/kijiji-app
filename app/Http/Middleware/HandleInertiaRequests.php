<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    private const MENU_PERMISSIONS = [
        'view dashboard',
        'view whatsapp accounts',
        'view openai',
        'view files',
        'view websites',
        'view customers',
        'view roles',
        'view users',
        'view user settings',
    ];

    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),

            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'success' => fn () => $request->session()->get('success'),
            ],

            'menuPermissions' => fn () => $this->getMenuPermissions($request),

            'data' => fn () => $request->session()->get('data'),

            'auth' => [
                'user' => $request->user(),
            ],
        ];
    }

    private function getMenuPermissions(Request $request): array
    {
        return $this->checkPermissions($request, self::MENU_PERMISSIONS);
    }

    private function checkPermissions(Request $request, array $permissions): array
    {
        $checkResult = [];
        $user = $request->user();

        if (! $user) {
            return $checkResult;
        }

        foreach ($permissions as $permission) {
            if (is_array($permission)) {
                $checkResult[$permission['name']] = $user->hasRole('Super Admin') || $user->hasAnyPermission($permission['permissions']);

                continue;
            }
            $checkResult[Str::camel('can '.$permission)] = $user->can($permission);
        }

        return $checkResult;
    }
}
