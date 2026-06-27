<?php

namespace App\Enums;

enum ApiCode: int
{
    case SUCCESS = 0;
    case ERROR = 1;
    case UNAUTHORIZED = 401;
    case FORBIDDEN = 403;
    case NOT_FOUND = 404;
    case VALIDATION_ERROR = 422;
    case SERVER_ERROR = 500;

    public function message(): string
    {
        return match ($this) {
            self::SUCCESS => '操作成功',
            self::ERROR => '操作失败',
            self::UNAUTHORIZED => '未登录或登录已过期',
            self::FORBIDDEN => '没有权限访问',
            self::NOT_FOUND => '资源不存在',
            self::VALIDATION_ERROR => '数据验证失败',
            self::SERVER_ERROR => '服务器内部错误',
        };
    }
}
