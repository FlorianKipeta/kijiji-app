<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Query\Builder;

class Message extends Model
{
    protected $fillable = ['type', 'text', 'message_id', 'previous_message_id', 'customer_id', 'timestamp', 'status'];

    const TEXT_MESSAGE = 'text';

    const BUTTON_MESSAGE = 'button';

    const IMAGE_MESSAGE = 'image';

    const AUDIO_MESSAGE = 'audio';

    const VIDEO_MESSAGE = 'video';

    const DOCUMENT_MESSAGE = 'document';

    const REACTION_MESSAGE = 'reaction';

    const STICKER_MESSAGE = 'sticker';

    const TEMPLATE_MESSAGE = 'template';

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
}
