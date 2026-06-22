#!/usr/bin/env bash
# Backup SQLite — ใส่ cron รายวัน:
# 0 3 * * * /var/www/adwaresource/deploy/backup-db.sh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DB_FILE="$ROOT_DIR/prisma/dev.db"
BACKUP_DIR="/var/backups/adwaresource"
STAMP="$(date +%Y-%m-%d_%H%M%S)"

mkdir -p "$BACKUP_DIR"

if [ ! -f "$DB_FILE" ]; then
  echo "ไม่พบ $DB_FILE"
  exit 1
fi

cp "$DB_FILE" "$BACKUP_DIR/dev-$STAMP.db"
find "$BACKUP_DIR" -name 'dev-*.db' -mtime +14 -delete

echo "Backup: $BACKUP_DIR/dev-$STAMP.db"
