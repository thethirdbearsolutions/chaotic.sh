#!/usr/bin/env bash
# Speed budget (CHT-1898): start the backend on a fresh database, seed a
# project, and measure the web UI against the VISION.md bar in Chromium.
#
#   frontend/speed/run.sh            # 2,000 issues
#   SPEED_ISSUES=500 frontend/speed/run.sh
#
# Needs: the backend's uv environment, `npm ci` in frontend/, a built
# bundle (npm run build), and a Chromium for Playwright.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
repo="$(cd "$here/../.." && pwd)"
port="${SPEED_PORT:-24399}"
issues="${SPEED_ISSUES:-2000}"
work="$(mktemp -d)"
trap 'kill "${server:-0}" 2>/dev/null || true; rm -rf "$work"' EXIT

cd "$repo/backend"
DATABASE_URL="sqlite+aiosqlite:///$work/speed.db" \
SECRET_KEY="speed-budget-not-a-secret" \
BCRYPT_ROUNDS=4 \
    uv run uvicorn app.main:app --host 127.0.0.1 --port "$port" > "$work/server.log" 2>&1 &
server=$!

for _ in $(seq 1 60); do
    curl -sf "http://127.0.0.1:$port/" > /dev/null && break
    sleep 1
done
curl -sf "http://127.0.0.1:$port/" > /dev/null || { cat "$work/server.log"; exit 1; }

cd "$repo/frontend"
echo "Seeding $issues issues..."
node speed/seed.mjs "http://127.0.0.1:$port" "$issues" > "$work/seed.json"
node speed/speed-budget.mjs "http://127.0.0.1:$port" "$work/seed.json" || {
    echo "--- server log (last 100 lines) ---"
    tail -n 100 "$work/server.log"
    exit 1
}
