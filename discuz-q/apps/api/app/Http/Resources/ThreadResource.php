<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ThreadResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'category_id' => $this->category_id,
            'last_posted_user_id' => $this->last_posted_user_id,
            'type' => $this->type,
            'title' => $this->title,
            'summary' => $this->summary,
            'price' => $this->price,
            'cover_image' => $this->cover_image,
            'images' => $this->images,
            'post_count' => $this->post_count,
            'view_count' => $this->view_count,
            'like_count' => $this->like_count,
            'share_count' => $this->share_count,
            'collect_count' => $this->collect_count,
            'is_approved' => $this->is_approved,
            'is_sticky' => $this->is_sticky,
            'is_essence' => $this->is_essence,
            'is_locked' => $this->is_locked,
            'last_posted_at' => $this->last_posted_at?->toDateTimeString(),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
            'user' => new UserResource($this->whenLoaded('user')),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'first_post' => new PostResource($this->whenLoaded('firstPost')),
        ];
    }
}
