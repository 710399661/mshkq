#!/bin/bash

# Discuz! Q 开发环境一键启动脚本
# 用法: ./scripts/dev.sh [api|web|admin|all]

set -e

RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
NC="\033[0m"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Discuz! Q 开发环境启动${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

SERVICE="${1:-all}"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

start_api() {
  echo -e "${YELLOW}启动后端 API...${NC}"
  cd "$ROOT_DIR/apps/api"

  if [ ! -f ".env" ]; then
    echo "  复制 .env.example -> .env"
    cp .env.example .env
    php artisan key:generate --quiet
  fi

  if [ ! -f "database/database.sqlite" ]; then
    echo "  初始化 SQLite 数据库..."
    touch database/database.sqlite
    php artisan migrate --force --quiet
    php artisan db:seed --force --quiet
  fi

  php artisan serve --host=0.0.0.0 --port=8000 &
  API_PID=$!
  echo "  ✓ API 已启动: http://localhost:8000 (PID: $API_PID)"
  echo $API_PID > "$ROOT_DIR/.api.pid"
}

start_web() {
  echo -e "${YELLOW}启动前台 Web...${NC}"
  cd "$ROOT_DIR/apps/web"

  if [ ! -f ".env.local" ]; then
    echo "  复制 .env.example -> .env.local"
    cp .env.example .env.local
  fi

  cd "$ROOT_DIR"
  pnpm --filter @discuzq/web dev &
  WEB_PID=$!
  echo "  ✓ Web 已启动: http://localhost:3000 (PID: $WEB_PID)"
  echo $WEB_PID > "$ROOT_DIR/.web.pid"
}

start_admin() {
  echo -e "${YELLOW}启动管理后台...${NC}"
  cd "$ROOT_DIR/apps/admin"

  if [ ! -f ".env.local" ]; then
    echo "  复制 .env.example -> .env.local"
    cp .env.example .env.local
  fi

  cd "$ROOT_DIR"
  pnpm --filter @discuzq/admin dev &
  ADMIN_PID=$!
  echo "  ✓ Admin 已启动: http://localhost:3001 (PID: $ADMIN_PID)"
  echo $ADMIN_PID > "$ROOT_DIR/.admin.pid"
}

stop_all() {
  echo ""
  echo -e "${YELLOW}正在停止所有服务...${NC}"
  for pid_file in .api.pid .web.pid .admin.pid; do
    if [ -f "$ROOT_DIR/$pid_file" ]; then
      pid=$(cat "$ROOT_DIR/$pid_file 2>/dev/null || true)
      if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
        kill "$pid" 2>/dev/null || true
        echo "  ✓ 已停止 PID: $pid"
      fi
      rm -f "$ROOT_DIR/$pid_file"
    fi
  done
  echo -e "${GREEN}所有服务已停止${NC}"
  exit 0
}

trap stop_all SIGINT SIGTERM

case "$SERVICE" in
  api)
    start_api
    ;;
  web)
    start_web
    ;;
  admin)
    start_admin
    ;;
  all)
    start_api
    sleep 2
    start_web
    start_admin
    ;;
  *)
    echo -e "${RED}未知服务: $SERVICE${NC}"
    echo "用法: ./scripts/dev.sh [api|web|admin|all]"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  服务启动完成${NC}"
echo -e "${GREEN}========================================${NC}"
echo "  API:   http://localhost:8000"
echo "  Web:   http://localhost:3000"
echo "  Admin: http://localhost:3001"
echo ""
echo -e "${YELLOW}按 Ctrl+C 停止所有服务${NC}"

wait
