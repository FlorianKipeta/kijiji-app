<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['message_id', 'customer_id', 'type', 'text', 'timestamp', 'status'];
}
