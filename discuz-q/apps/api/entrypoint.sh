#!/bin/sh

set -e

echo "Waiting for database..."
until php -r "try { \$pdo = new PDO('mysql:host='.getenv('DB_HOST').';port='.getenv('DB_PORT').';dbname='.getenv('DB_DATABASE'), getenv('DB_USERNAME'), getenv('DB_PASSWORD')); echo 'Connected'; exit(0); } catch(PDOException \$e) { sleep(1); }" 2>/dev/null; do
    sleep 1
done

echo "Running migrations..."
php artisan migrate --force

if [ "$RUN_SEEDER" = "true" ]; then
    echo "Running seeders..."
    php artisan db:seed --force
fi

echo "Caching config..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Starting services..."
exec "$@"
