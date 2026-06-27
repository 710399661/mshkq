<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'sort',
        'parent_id',
        'depth',
        'thread_count',
        'is_enabled',
        'is_home',
    ];

    protected $casts = [
        'sort' => 'integer',
        'parent_id' => 'integer',
        'depth' => 'integer',
        'thread_count' => 'integer',
        'is_enabled' => 'boolean',
        'is_home' => 'boolean',
        'deleted_at' => 'datetime',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function threads(): HasMany
    {
        return $this->hasMany(Thread::class);
    }
}
