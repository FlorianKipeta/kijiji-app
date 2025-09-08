<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OpenAIConfig extends Model
{
    protected $table = 'openais';

    protected $fillable = [
        'model',
        'instructions',
        'temperature',
        'max_tokens',
        'key',
        'vector_store',
    ];

    protected $hidden = ['key'];
}
