<?php

use App\Http\Controllers\API\FileAPIController;
use App\Http\Controllers\API\NotificationAPIController;
use App\Http\Controllers\API\ProjectAPIController;
use App\Http\Controllers\API\RoleAPIController;
use App\Http\Controllers\API\UserAPIController;
use App\Http\Controllers\Auth\ResetUserPasswordController;
use App\Http\Controllers\Auth\RolesController;
use App\Http\Controllers\Auth\UpdateUserPermissionController;
use App\Http\Controllers\Auth\UpdateUserRoleController;
use App\Http\Controllers\Auth\UsersController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\WebhookVerificationController;
use App\Http\Controllers\WhatsappController;
use App\Http\Middleware\MustChangePassword;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::get('/dashboard', DashboardController::class)->middleware(['auth', 'verified', MustChangePassword::class])->name('dashboard');

Route::middleware(['auth', MustChangePassword::class])->group(function () {

    Route::resource('projects', ProjectController::class)->except(['create', 'edit']);
    Route::resource('projects.files', FileController::class)->shallow()->only(['store', 'destroy']);
    Route::resource('projects.whatsapp', WhatsappController::class)->shallow()->only(['store', 'destroy']);
    Route::resource('customers', CustomerController::class)->only(['index', 'show', 'store', 'update', 'destroy']);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('notifications', [NotificationAPIController::class, 'index'])->name('notifications');
    Route::post('notifications/{id}/mark-as-read', [NotificationAPIController::class, 'markAsRead'])->name('notifications.read');
    Route::post('notifications/mark-all-as-read', [NotificationAPIController::class, 'markAllAsRead'])->name('notifications.readAll');

    /*
    |--------------------------------------------------------------------------------------------------
    | User Managements module routes
    |--------------------------------------------------------------------------------------------------
    */
    Route::prefix('user-management')->group(function () {
        Route::resource('roles', RolesController::class)->except(['show']);
        Route::resource('users', UsersController::class);
        Route::post('users/{user}/reset-password', ResetUserPasswordController::class)->name('users.reset-password'); //
        Route::put('users/{user}/roles/update', UpdateUserRoleController::class)->name('users-roles.update');
        Route::put('users/{user}/permissions/update', UpdateUserPermissionController::class)->name('users-permissions.update');
        // Route::resource('user-settings', UserSettingController::class)->only(['index', 'store']);
    });

    /*
    |--------------------------------------------------------------------------------------------------
    | API routes that returns json data, these routes can be consumed by any other module
    |--------------------------------------------------------------------------------------------------
    */
    Route::prefix('api')->name('api.')->group(function () {
        Route::get('projects', ProjectAPIController::class)->name('projects');
        Route::get('files/{project}', FileAPIController::class)->name('files');
        Route::get('users', UserAPIController::class)->name('users');
        Route::get('users-with-role/{role}', [UserAPIController::class, 'usersWithRole'])->name('users-with-role');
        Route::get('roles', RoleAPIController::class)->name('roles');
    });
});
Route::get('/webhook', WebhookVerificationController::class);
Route::webhooks('webhook');
require __DIR__.'/auth.php';
