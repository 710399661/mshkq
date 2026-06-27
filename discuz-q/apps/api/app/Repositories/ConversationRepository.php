<?php

namespace App\Repositories;

use App\Models\Conversation;
use App\Models\ConversationMember;
use Illuminate\Support\Facades\DB;

class ConversationRepository extends BaseRepository
{
    public function __construct(Conversation $model)
    {
        parent::__construct($model);
    }

    public function getUserConversations(int $userId, int $perPage = 20)
    {
        return Conversation::whereHas('members', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
            ->with([
                'lastMessage',
                'members' => function ($query) {
                    $query->with('user');
                },
            ])
            ->orderByDesc('last_message_at')
            ->orderByDesc('id')
            ->paginate($perPage);
    }

    public function findDirectConversation(int $user1Id, int $user2Id)
    {
        return Conversation::where('type', 'direct')
            ->whereHas('members', function ($query) use ($user1Id) {
                $query->where('user_id', $user1Id);
            })
            ->whereHas('members', function ($query) use ($user2Id) {
                $query->where('user_id', $user2Id);
            })
            ->first();
    }

    public function createDirectConversation(int $user1Id, int $user2Id)
    {
        return DB::transaction(function () use ($user1Id, $user2Id) {
            $conversation = Conversation::create([
                'type' => 'direct',
            ]);

            ConversationMember::create([
                'conversation_id' => $conversation->id,
                'user_id' => $user1Id,
                'joined_at' => now(),
            ]);

            ConversationMember::create([
                'conversation_id' => $conversation->id,
                'user_id' => $user2Id,
                'joined_at' => now(),
            ]);

            return $conversation->load('members.user');
        });
    }

    public function getOrCreateDirectConversation(int $user1Id, int $user2Id)
    {
        $conversation = $this->findDirectConversation($user1Id, $user2Id);
        if ($conversation) {
            return $conversation;
        }
        return $this->createDirectConversation($user1Id, $user2Id);
    }

    public function isMember(int $conversationId, int $userId): bool
    {
        return ConversationMember::where('conversation_id', $conversationId)
            ->where('user_id', $userId)
            ->exists();
    }

    public function getMember(int $conversationId, int $userId)
    {
        return ConversationMember::where('conversation_id', $conversationId)
            ->where('user_id', $userId)
            ->first();
    }

    public function updateLastRead(int $conversationId, int $userId)
    {
        return ConversationMember::where('conversation_id', $conversationId)
            ->where('user_id', $userId)
            ->update(['last_read_at' => now()]);
    }

    public function getUnreadCount(int $userId): int
    {
        return Conversation::whereHas('members', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
            ->whereHas('messages', function ($query) use ($userId) {
                $query->where('is_read', false)
                    ->where('user_id', '!=', $userId);
            })
            ->count();
    }
}
