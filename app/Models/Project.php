<?php

namespace App\Models;

use App\Traits\HasCreator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Project extends Model
{
    use HasCreator, HasSlug;

    protected $fillable = [
        'name',
        'slug',
        'purpose',
        'instructions',
        'model',
        'vector_store',
        'created_by',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->slugsShouldBeNoLongerThan(60)
            ->saveSlugsTo('slug');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function files(): HasMany
    {
        return $this->hasMany(File::class);
    }

    public function whatsappAccount(): HasOne
    {
        return $this->hasOne(WhatsappAccount::class);
    }
}
