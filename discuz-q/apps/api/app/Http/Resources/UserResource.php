<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'name' => $this->name,
            'email' => $this->when($request->user()?->id === $this->id, $this->email),
            'mobile' => $this->when($request->user()?->id === $this->id, $this->mobile),
            'avatar' => $this->avatar,
            'bio' => $this->bio,
            'signature' => $this->signature,
            'gender' => $this->gender,
            'birthday' => $this->birthday?->format('Y-m-d'),
            'location' => $this->location,
            'website' => $this->website,
            'thread_count' => $this->thread_count,
            'post_count' => $this->post_count,
            'follow_count' => $this->follow_count,
            'fans_count' => $this->fans_count,
            'like_count' => $this->like_count,
            'status' => $this->status,
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
