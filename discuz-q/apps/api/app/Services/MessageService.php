<?php

namespace App\Services;

use App\Repositories\ConversationRepository;
use App\Repositories\MessageRepository;

class MessageService extends BaseService
{
    protected $conversationRepository;
    protected $messageRepository;

    public function __construct(
        ConversationRepository $conversationRepository,
        MessageRepository $messageRepository
    ) {
        $this->conversationRepository = $conversationRepository;
        $this->messageRepository = $messageRepository;
    }

    public function getConversations(int $userId, int $perPage = 20)
    {
        return $this->conversationRepository->getUserConversations($userId, $perPage);
    }

    public function createConversation(int $userId, int $targetUserId)
    {
        if ($userId === $targetUserId) {
            throw new \InvalidArgumentException('不能和自己发起对话');
        }

        return $this->conversationRepository->getOrCreateDirectConversation($userId, $targetUserId);
    }

    public function getMessages(int $conversationId, int $userId, int $perPage = 20)
    {
        if (!$this->conversationRepository->isMember($conversationId, $userId)) {
            throw new \RuntimeException('您不是该会话成员');
        }

        return $this->messageRepository->getMessages($conversationId, $perPage);
    }

    public function sendMessage(int $conversationId, int $userId, string $content, string $type = 'text')
    {
        if (!$this->conversationRepository->isMember($conversationId, $userId)) {
            throw new \RuntimeException('您不是该会话成员');
        }

        return $this->messageRepository->createMessage($conversationId, $userId, $type, $content);
    }

    public function markAsRead(int $conversationId, int $userId)
    {
        if (!$this->conversationRepository->isMember($conversationId, $userId)) {
            throw new \RuntimeException('您不是该会话成员');
        }

        $count = $this->messageRepository->markAsRead($conversationId, $userId);
        $this->conversationRepository->updateLastRead($conversationId, $userId);

        return $count;
    }

    public function getUnreadCount(int $userId): int
    {
        return $this->conversationRepository->getUnreadCount($userId);
    }
}
