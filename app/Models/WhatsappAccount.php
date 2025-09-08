<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WhatsappAccount extends Model
{
    protected $fillable = [
        'app_id',
        'phone_number_id',
        'business_account_id',
        'address',
        'description',
        'vertical',
        'about',
        'email',
        'access_token',
    ];
}
