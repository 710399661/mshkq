<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ThreadPurchase extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'thread_id',
        'price',
        'paid_at',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'thread_id' => 'integer',
        'price' => 'decimal:2',
        'paid_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function thread(): BelongsTo
    {
        return $this->belongsTo(Thread::class);
    }
}
