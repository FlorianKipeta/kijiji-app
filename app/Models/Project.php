<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Project extends Model
{
    use HasSlug;
    protected $fillable = [
        'name',
        'slug',
        'purpose',
        'instructions',
        'model',
        'vector_store'
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->slugsShouldBeNoLongerThan(60)
            ->saveSlugsTo('slug');
    }
}
