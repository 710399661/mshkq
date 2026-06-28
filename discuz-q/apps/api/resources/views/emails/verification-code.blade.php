<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>邮箱验证</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .code-box { background: #f5f5f5; padding: 20px; text-align: center; font-size: 32px; letter-spacing: 8px; font-weight: bold; margin: 20px 0; border-radius: 8px; }
        .footer { color: #666; font-size: 12px; margin-top: 30px; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Discuz! Q</h1>
        </div>
        <p>您好，{{ $username }}：</p>
        <p>您正在验证邮箱，请使用以下验证码：</p>
        <div class="code-box">{{ $code }}</div>
        <p>验证码在 {{ $expireMinutes }} 分钟内有效，请尽快完成验证。</p>
        <p>如果您没有发起此请求，请忽略此邮件。</p>
        <div class="footer">
            <p>此邮件由系统自动发送，请勿回复。</p>
            <p>&copy; {{ date('Y') }} Discuz! Q. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
