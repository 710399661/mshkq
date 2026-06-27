<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'thread_count',
        'sort',
    ];

    protected $casts = [
        'thread_count' => 'integer',
        'sort' => 'integer',
    ];

    public function threads(): BelongsToMany
    {
        return $this->belongsToMany(Thread::class, 'thread_tag');
    }
}
