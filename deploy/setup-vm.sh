#!/usr/bin/env bash
# รันครั้งแรกบน VM (Debian/Ubuntu) ด้วย root หรือ sudo
# curl -fsSL ... | bash   หรือ   sudo bash deploy/setup-vm.sh
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/adwaresource}"
APP_USER="${APP_USER:-adwaresource}"

echo "==> ติดตั้งแพ็กเกจพื้นฐาน"
apt-get update
apt-get install -y git curl nginx certbot python3-certbot-nginx build-essential python3

echo "==> ติดตั้ง Node.js 20"
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

echo "==> ติดตั้ง PM2"
npm install -g pm2

echo "==> สร้าง swap 1GB (ช่วย build บน e2-micro 1GB RAM)"
if [ ! -f /swapfile ]; then
  fallocate -l 1G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "==> สร้าง user และโฟลเดอร์"
id -u "$APP_USER" &>/dev/null || useradd -m -s /bin/bash "$APP_USER"
mkdir -p "$APP_DIR" /var/backups/adwaresource
chown -R "$APP_USER:$APP_USER" "$APP_DIR" /var/backups/adwaresource

echo "==> เปิด firewall (ถ้ามี ufw)"
if command -v ufw >/dev/null 2>&1; then
  ufw allow OpenSSH || true
  ufw allow 'Nginx Full' || true
fi

echo ""
echo "เสร็จขั้นตอนเตรียม VM แล้ว"
echo "ขั้นตอนถัดไป (รันใน $APP_DIR):"
echo "  1. git clone <repo> $APP_DIR"
echo "  2. cp deploy/env.example .env && nano .env"
echo "  3. bash deploy/deploy.sh"
echo "  4. ตั้ง nginx: deploy/nginx/adwaresource.conf"
echo "  5. sudo certbot --nginx -d yourdomain.com"
