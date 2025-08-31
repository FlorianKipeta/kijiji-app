<?php

namespace App\Traits;

trait QueryModel
{
    /**
     * return array of valid relations from the client request query
     */
    public function validRelationsFromQuery($requestWithValue, array $modelRelations): array
    {
        if (! $requestWithValue) {
            return [];
        }
        $validRelations = collect($modelRelations);

        return collect(explode(',', $requestWithValue))
            ->map(fn ($item) => $validRelations->get(trim($item)))
            ->filter(fn ($item) => $item !== null)->flatten(1)->toArray();
    }

    /**
     * return array of valid count relatiion from the client request query
     */
    public function validCountsFromQuery($requestCountValue, array $modelCounts): array
    {
        if (! $requestCountValue) {
            return [];
        }
        $validRelations = collect($modelCounts);

        return collect(explode(',', $requestCountValue))
            ->map(fn ($item) => $validRelations->get($item))
            ->filter(fn ($item) => $item !== null)->flatten()->toArray();
    }

    /**
     * return valid colums from the client request query
     */
    public function validColumnsFormQuery(string $requestQuery, array $modelColumns): \Illuminate\Support\Collection
    {
        $data = collect($this->commaSeparatedValueToArray($requestQuery));

        return $data->map(
            function ($val) use ($modelColumns) {
                return $modelColumns[trim($val)] ?? null;
            }
        )->filter(fn ($val) => $val !== null)
            ->flatten();
    }

    private function commaSeparatedValueToArray($value): array
    {
        return collect(explode(',', $value))
            ->map(fn ($val) => trim($val))
            ->filter(fn ($val) => boolval($val))->toArray();
    }
}
