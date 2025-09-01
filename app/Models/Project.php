<?php

namespace App\Models;

use App\Traits\HasCreator;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Project extends Model
{
    use HasSlug, HasCreator;
    protected $fillable = [
        'name',
        'slug',
        'purpose',
        'instructions',
        'model',
        'vector_store',
        'created_by'
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->slugsShouldBeNoLongerThan(60)
            ->saveSlugsTo('slug');
    }
}
