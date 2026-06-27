<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Controller;
use App\Services\MessageService;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    protected $messageService;

    public function __construct(MessageService $messageService)
    {
        $this->messageService = $messageService;
    }

    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 20);
        $conversations = $this->messageService->getConversations($request->user()->id, $perPage);

        return $this->success([
            'data' => $conversations->items(),
            'meta' => [
                'current_page' => $conversations->currentPage(),
                'per_page' => $conversations->perPage(),
                'total' => $conversations->total(),
                'last_page' => $conversations->lastPage(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
        ]);

        try {
            $conversation = $this->messageService->createConversation(
                $request->user()->id,
                (int) $validated['user_id']
            );

            return $this->success($conversation, '会话创建成功');
        } catch (\InvalidArgumentException $e) {
            return $this->error($e->getMessage());
        }
    }

    public function messages(int $id, Request $request)
    {
        $perPage = $request->input('per_page', 20);

        try {
            $messages = $this->messageService->getMessages($id, $request->user()->id, $perPage);

            return $this->success([
                'data' => $messages->items(),
                'meta' => [
                    'current_page' => $messages->currentPage(),
                    'per_page' => $messages->perPage(),
                    'total' => $messages->total(),
                    'last_page' => $messages->lastPage(),
                ],
            ]);
        } catch (\RuntimeException $e) {
            return $this->forbidden($e->getMessage());
        }
    }

    public function sendMessage(int $id, Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'type' => 'sometimes|string|in:text,image,system',
        ]);

        try {
            $message = $this->messageService->sendMessage(
                $id,
                $request->user()->id,
                $validated['content'],
                $validated['type'] ?? 'text'
            );

            return $this->success($message, '消息发送成功');
        } catch (\RuntimeException $e) {
            return $this->forbidden($e->getMessage());
        }
    }

    public function read(int $id, Request $request)
    {
        try {
            $count = $this->messageService->markAsRead($id, $request->user()->id);

            return $this->success(['count' => $count], '标记已读成功');
        } catch (\RuntimeException $e) {
            return $this->forbidden($e->getMessage());
        }
    }

    public function unreadCount(Request $request)
    {
        $count = $this->messageService->getUnreadCount($request->user()->id);

        return $this->success(['count' => $count]);
    }
}
