#!/usr/bin/env bash
# Deploy / อัปเดตแอป — รันที่ root โปรเจกต์บนเซิร์ฟเวอร์
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [ ! -f .env ]; then
  echo "ไม่พบ .env — คัดลอกจาก deploy/env.example ก่อน"
  exit 1
fi

echo "==> npm ci"
npm ci

echo "==> prisma generate"
npx prisma generate

echo "==> build (ใช้ RAM จำกัดสำหรับ e2-micro)"
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=768}"
npm run build

echo "==> database"
npm run db:push
npm run db:seed

echo "==> pm2"
if pm2 describe adwaresource >/dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --update-env
else
  pm2 start ecosystem.config.cjs
fi
pm2 save

echo ""
echo "Deploy สำเร็จ — ตรวจสอบ: pm2 status && pm2 logs adwaresource --lines 30"
