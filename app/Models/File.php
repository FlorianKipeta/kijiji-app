<?php

namespace App\Models;

use App\Traits\HasCreator;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasCreator;

    protected $fillable = ['name', 'path', 'file_id', 'size', 'created_by'];
}
