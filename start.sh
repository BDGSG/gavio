#!/bin/sh

# Start cron for CJ tracking sync (every 4h)
echo "Starting CJ tracking cron (every 4h)..."
(
  while true; do
    sleep 14400  # 4 hours
    echo "[CRON $(date)] Running CJ tracking sync..."
    wget -qO- "http://localhost:3000/api/cron?secret=${NEXT_PUBLIC_ADMIN_PASSWORD}" || echo "[CRON] Failed"
  done
) &

# Start Next.js
exec node server.js
