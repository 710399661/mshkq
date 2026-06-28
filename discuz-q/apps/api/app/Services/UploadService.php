<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadService
{
    protected $disk;

    public function __construct()
    {
        $this->disk = config('filesystems.default', 'public');
    }

    public function uploadImage(UploadedFile $file): array
    {
        return $this->upload($file, 'images', [
            'max_width' => 4096,
            'max_height' => 4096,
        ]);
    }

    public function uploadAvatar(UploadedFile $file, int $userId): array
    {
        $filename = "avatar_{$userId}_" . time() . '.' . $file->getClientOriginalExtension();
        $path = "avatars/{$filename}";

        $fullPath = $file->storeAs('avatars', $filename, $this->disk);

        return [
            'url' => Storage::url($fullPath),
            'path' => $fullPath,
            'filename' => $filename,
            'size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
        ];
    }

    public function uploadAttachment(UploadedFile $file): array
    {
        return $this->upload($file, 'attachments');
    }

    protected function upload(UploadedFile $file, string $folder, array $options = []): array
    {
        $filename = $this->generateFilename($file);
        $path = "{$folder}/" . date('Y/md') . '/' . $filename;

        $fullPath = $file->storeAs($folder . '/' . date('Y/md'), $filename, $this->disk);

        return [
            'url' => Storage::url($fullPath),
            'path' => $fullPath,
            'filename' => $filename,
            'size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
        ];
    }

    protected function generateFilename(UploadedFile $file): string
    {
        $extension = $file->getClientOriginalExtension();
        return Str::random(40) . '.' . $extension;
    }

    public function delete(string $path): bool
    {
        if (Storage::exists($path)) {
            return Storage::delete($path);
        }
        return false;
    }
}
