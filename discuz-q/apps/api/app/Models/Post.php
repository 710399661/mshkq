<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'thread_id',
        'user_id',
        'parent_id',
        'reply_post_id',
        'reply_user_id',
        'content',
        'content_html',
        'ip',
        'reply_count',
        'like_count',
        'is_first',
        'is_comment',
        'is_approved',
        'deleted_user_id',
    ];

    protected $casts = [
        'thread_id' => 'integer',
        'user_id' => 'integer',
        'parent_id' => 'integer',
        'reply_post_id' => 'integer',
        'reply_user_id' => 'integer',
        'reply_count' => 'integer',
        'like_count' => 'integer',
        'is_first' => 'boolean',
        'is_comment' => 'boolean',
        'is_approved' => 'boolean',
        'deleted_user_id' => 'integer',
        'deleted_at' => 'datetime',
    ];

    public function thread(): BelongsTo
    {
        return $this->belongsTo(Thread::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Post::class, 'parent_id');
    }

    public function replies(): HasMany
    {
        return $this->hasMany(Post::class, 'parent_id');
    }

    public function replyPost(): BelongsTo
    {
        return $this->belongsTo(Post::class, 'reply_post_id');
    }

    public function replyUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reply_user_id');
    }

    public function likes(): HasMany
    {
        return $this->hasMany(PostLike::class);
    }
}
