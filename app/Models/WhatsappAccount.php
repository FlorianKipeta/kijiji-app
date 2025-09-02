<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WhatsappAccount extends Model
{
    protected $fillable = [
        'phone_number_id', 'waba_id', 'business_id', 'code', 'status', 'project_id', 'access_token', 'platform_type', 'display_phone_number', 'verified_name',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
