<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Controller;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 20);
        $notifications = $request->user()->notifications()
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return $this->success([
            'data' => $notifications->items(),
            'meta' => [
                'current_page' => $notifications->currentPage(),
                'per_page' => $notifications->perPage(),
                'total' => $notifications->total(),
                'last_page' => $notifications->lastPage(),
            ],
        ]);
    }

    public function readAll(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();

        return $this->success(null, '全部已读成功');
    }

    public function read(int $id, Request $request)
    {
        $notification = $request->user()->notifications()->find($id);

        if (!$notification) {
            return $this->notFound('通知不存在');
        }

        if ($notification->read_at === null) {
            $notification->markAsRead();
        }

        return $this->success($notification, '标记已读成功');
    }

    public function unreadCount(Request $request)
    {
        $count = $request->user()->unreadNotifications()->count();

        return $this->success(['count' => $count]);
    }
}
