<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Openai extends Model
{
    protected $fillable = [
        'model',
        'instructions',
        'temperature',
        'max_tokens',
        'key',
        'vector_store'
    ];
}
