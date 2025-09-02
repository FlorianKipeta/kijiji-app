<?php

namespace App\Models;

use App\Traits\HasCreator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class File extends Model
{
    use HasCreator;

    protected $fillable = ['name', 'path', 'file_id', 'size', 'project_id', 'created_by'];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
