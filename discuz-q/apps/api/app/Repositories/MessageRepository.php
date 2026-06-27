<?php

namespace App\Repositories;

use App\Models\Message;
use App\Models\Conversation;
use Illuminate\Support\Facades\DB;

class MessageRepository extends BaseRepository
{
    public function __construct(Message $model)
    {
        parent::__construct($model);
    }

    public function getMessages(int $conversationId, int $perPage = 20)
    {
        return $this->model
            ->where('conversation_id', $conversationId)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function createMessage(int $conversationId, int $userId, string $type, string $content = '')
    {
        return DB::transaction(function () use ($conversationId, $userId, $type, $content) {
            $message = $this->model->create([
                'conversation_id' => $conversationId,
                'user_id' => $userId,
                'type' => $type,
                'content' => $content,
                'is_read' => false,
            ]);

            Conversation::where('id', $conversationId)->update([
                'last_message_id' => $message->id,
                'last_message_at' => now(),
            ]);

            return $message->load('user');
        });
    }

    public function markAsRead(int $conversationId, int $userId): int
    {
        return $this->model
            ->where('conversation_id', $conversationId)
            ->where('user_id', '!=', $userId)
            ->where('is_read', false)
            ->update(['is_read' => true]);
    }

    public function getUnreadCountForConversation(int $conversationId, int $userId): int
    {
        return $this->model
            ->where('conversation_id', $conversationId)
            ->where('user_id', '!=', $userId)
            ->where('is_read', false)
            ->count();
    }
}
