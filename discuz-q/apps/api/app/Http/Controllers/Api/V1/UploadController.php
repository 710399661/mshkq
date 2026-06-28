<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Controller;
use App\Services\UploadService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UploadController extends Controller
{
    protected $uploadService;

    public function __construct(UploadService $uploadService)
    {
        $this->uploadService = $uploadService;
    }

    public function image(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,jpg,png,gif,webp|max:5120',
        ]);

        try {
            $result = $this->uploadService->uploadImage($request->file('file'));

            return $this->success([
                'url' => $result['url'],
                'path' => $result['path'],
                'filename' => $result['filename'],
                'size' => $result['size'],
                'mime_type' => $result['mime_type'],
            ], '上传成功');
        } catch (\Exception $e) {
            return $this->error('上传失败：' . $e->getMessage());
        }
    }

    public function avatar(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,jpg,png,gif,webp|max:2048',
        ]);

        try {
            $result = $this->uploadService->uploadAvatar($request->file('file'), $request->user()->id);

            return $this->success([
                'url' => $result['url'],
                'path' => $result['path'],
            ], '头像上传成功');
        } catch (\Exception $e) {
            return $this->error('上传失败：' . $e->getMessage());
        }
    }

    public function attachment(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,zip,rar|max:10240',
        ]);

        try {
            $result = $this->uploadService->uploadAttachment($request->file('file'));

            return $this->success([
                'url' => $result['url'],
                'path' => $result['path'],
                'filename' => $result['filename'],
                'size' => $result['size'],
            ], '上传成功');
        } catch (\Exception $e) {
            return $this->error('上传失败：' . $e->getMessage());
        }
    }

    public function config(): JsonResponse
    {
        $config = [
            'driver' => config('filesystems.default'),
            'max_image_size' => 5 * 1024 * 1024,
            'max_avatar_size' => 2 * 1024 * 1024,
            'max_attachment_size' => 10 * 1024 * 1024,
            'allowed_image_types' => ['jpeg', 'jpg', 'png', 'gif', 'webp'],
            'allowed_attachment_types' => ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'rar'],
        ];

        return $this->success($config);
    }
}
