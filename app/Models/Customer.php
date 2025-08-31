<?php

namespace App\Models;

use App\Traits\HasCreator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;

class Customer extends Model
{
    use HasCreator;

    protected $fillable = ['name', 'email', 'phone', 'location', 'created_by', 'address'];

    public function scopeSearch($query, ?string $terms = null): void
    {
        $operator = 'like';
        if (config('database.default') === 'pgsql') {
            $operator = 'ilike';
        }

        collect(str_getcsv($terms, ' ', '"'))->filter()->each(function ($term) use ($query, $operator) {
            $term = '%'.preg_replace('/[^A-Za-z0-9]/', '', $term).'%';
            $query->whereIn('id', function (Builder $query) use ($term, $operator) {
                $query->select('c.id')
                    ->from('customers', 'c')
                    ->where(function (Builder $query) use ($term, $operator) {
                        $query->where('c.name', $operator, $term)
                            ->orWhere('c.email', $operator, $term)
                            ->orWhere('c.location', $operator, $term)
                            ->orWhere('c.phone', $operator, '%'.$term);
                    });
            });
        });
    }
}
