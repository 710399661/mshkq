<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Thread extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'category_id',
        'last_posted_user_id',
        'type',
        'title',
        'summary',
        'price',
        'cover_image',
        'images',
        'post_count',
        'view_count',
        'like_count',
        'share_count',
        'collect_count',
        'is_approved',
        'is_sticky',
        'is_essence',
        'is_locked',
        'is_paid',
        'free_words',
        'last_posted_at',
        'deleted_user_id',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'category_id' => 'integer',
        'last_posted_user_id' => 'integer',
        'type' => 'integer',
        'price' => 'decimal:2',
        'images' => 'array',
        'post_count' => 'integer',
        'view_count' => 'integer',
        'like_count' => 'integer',
        'share_count' => 'integer',
        'collect_count' => 'integer',
        'is_approved' => 'boolean',
        'is_sticky' => 'boolean',
        'is_essence' => 'boolean',
        'is_locked' => 'boolean',
        'is_paid' => 'boolean',
        'free_words' => 'integer',
        'last_posted_at' => 'datetime',
        'deleted_user_id' => 'integer',
        'deleted_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function lastPostedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'last_posted_user_id');
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function firstPost()
    {
        return $this->hasOne(Post::class)->where('is_first', true);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'thread_tag');
    }

    public function likes(): HasMany
    {
        return $this->hasMany(ThreadLike::class);
    }

    public function collects(): HasMany
    {
        return $this->hasMany(ThreadCollect::class);
    }

    public function purchases(): HasMany
    {
        return $this->hasMany(ThreadPurchase::class);
    }
}
