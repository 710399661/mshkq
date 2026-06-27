<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'thread_id' => $this->thread_id,
            'user_id' => $this->user_id,
            'parent_id' => $this->parent_id,
            'reply_post_id' => $this->reply_post_id,
            'reply_user_id' => $this->reply_user_id,
            'content' => $this->content,
            'content_html' => $this->content_html,
            'ip' => $this->when($request->user()?->hasRole('admin'), $this->ip),
            'reply_count' => $this->reply_count,
            'like_count' => $this->like_count,
            'is_first' => $this->is_first,
            'is_comment' => $this->is_comment,
            'is_approved' => $this->is_approved,
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
            'user' => new UserResource($this->whenLoaded('user')),
            'reply_user' => new UserResource($this->whenLoaded('replyUser')),
            'thread' => new ThreadResource($this->whenLoaded('thread')),
        ];
    }
}
