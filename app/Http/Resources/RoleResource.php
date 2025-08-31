<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\MissingValue;

class RoleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'permissionsAssigned' => $this->permissions_count,
            'usersAssigned' => $this->users_count,
            'created_at' => $this->created_at,
            'permissions' => (function () {
                $permissions = $this->whenLoaded('permissions');

                if ($permissions instanceof MissingValue) {
                    return null;
                }

                return $permissions->pluck('name');
            })(),
        ];
    }
}
