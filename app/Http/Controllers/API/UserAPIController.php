<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\QueryModel;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\Permission\Models\Role;

class UserAPIController extends Controller
{
    use QueryModel;

    const RELATIONS = [
    ];

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): AnonymousResourceCollection
    {
        $request->validate([
            'page_size' => ['integer'],
            'paginate' => ['boolean'],
        ]);

        $parcels = User::query()
            ->when($request->has('with'), fn ($query) => $query->with($this->validRelationsFromQuery($request->with, self::RELATIONS)))
            ->latest('id')
            ->when($request->q, fn ($query) => $query->search($request->q));

        return UserResource::collection(
            $request->paginate ?
                $parcels->paginate($request->page_size ?? 100) :
                $parcels->limit($request->page_size ?? 100)->get()
        );
    }

    public function usersWithRole(Request $request, Role $role): AnonymousResourceCollection
    {
        $users = $role->users;

        return UserResource::collection($users);
    }
}
