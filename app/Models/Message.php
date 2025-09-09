<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    const TEXT_MESSAGE = 'text';

    const BUTTON_MESSAGE = 'button';

    const IMAGE_MESSAGE = 'image';

    const AUDIO_MESSAGE = 'audio';

    const VIDEO_MESSAGE = 'video';

    const DOCUMENT_MESSAGE = 'document';

    protected $fillable = ['message_id', 'customer_id', 'type', 'text', 'timestamp', 'status'];
}
