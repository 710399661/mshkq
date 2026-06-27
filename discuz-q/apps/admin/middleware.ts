import { NextResponse, type NextRequest } from 'next/server';

const isDev = process.env.NODE_ENV !== 'production';

function buildCspHeader(): string {
  const directives = [
    "default-src 'self'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];

  if (isDev) {
    directives.push("script-src 'self' 'unsafe-eval' 'unsafe-inline'");
    directives.push("style-src 'self' 'unsafe-inline'");
  } else {
    directives.push("script-src 'self' 'unsafe-inline'");
    directives.push("style-src 'self' 'unsafe-inline'");
  }

  return directives.join('; ');
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const cspHeader = buildCspHeader();

  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
