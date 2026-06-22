#!/usr/bin/env bash
# สร้าง VM สำหรับ UAT — adwaresource.co.th
# ใช้: bash deploy/gcloud-create-vm.sh
set -euo pipefail

PROJECT="${PROJECT:-adwaresource-2026}"
ZONE="${ZONE:-us-west1-a}"
REGION="${REGION:-us-west1}"
INSTANCE="${INSTANCE:-adware-uat}"
MACHINE_TYPE="${MACHINE_TYPE:-e2-custom-2-4096}"
DISK_SIZE="${DISK_SIZE:-20}"

echo "==> Project: $PROJECT | Zone: $ZONE | VM: $INSTANCE"

gcloud config set project "$PROJECT"

echo "==> เปิด API ที่จำเป็น"
gcloud services enable compute.googleapis.com --project="$PROJECT"

echo "==> Firewall HTTP/HTTPS (ถ้ายังไม่มี)"
gcloud compute firewall-rules describe allow-http-https --project="$PROJECT" 2>/dev/null || \
gcloud compute firewall-rules create allow-http-https \
  --project="$PROJECT" \
  --direction=INGRESS \
  --priority=1000 \
  --network=default \
  --action=ALLOW \
  --rules=tcp:80,tcp:443 \
  --source-ranges=0.0.0.0/0 \
  --target-tags=http-server,https-server

echo "==> Reserve static IP"
gcloud compute addresses describe "${INSTANCE}-ip" --region="$REGION" --project="$PROJECT" 2>/dev/null || \
gcloud compute addresses create "${INSTANCE}-ip" \
  --project="$PROJECT" \
  --region="$REGION"

STATIC_IP=$(gcloud compute addresses describe "${INSTANCE}-ip" \
  --region="$REGION" \
  --project="$PROJECT" \
  --format='get(address)')
echo "Static IP: $STATIC_IP"

echo "==> สร้าง VM"
if gcloud compute instances describe "$INSTANCE" --zone="$ZONE" --project="$PROJECT" >/dev/null 2>&1; then
  echo "VM $INSTANCE มีอยู่แล้ว — ข้ามการสร้าง"
else
  gcloud compute instances create "$INSTANCE" \
    --project="$PROJECT" \
    --zone="$ZONE" \
    --machine-type="$MACHINE_TYPE" \
    --network-interface=address="$STATIC_IP",network-tier=PREMIUM,subnet=default \
    --maintenance-policy=MIGRATE \
    --provisioning-model=STANDARD \
    --tags=http-server,https-server \
    --image-family=debian-12 \
    --image-project=debian-cloud \
    --boot-disk-size="${DISK_SIZE}GB" \
    --boot-disk-type=pd-balanced \
    --metadata=enable-osconfig=TRUE \
    --scopes=default
fi

echo ""
echo "=========================================="
echo "  VM พร้อมแล้ว"
echo "  Name:  $INSTANCE"
echo "  Zone:  $ZONE"
echo "  IP:    $STATIC_IP"
echo "=========================================="
echo ""
echo "SSH เข้าเครื่อง:"
echo "  gcloud compute ssh $INSTANCE --zone=$ZONE --project=$PROJECT"
echo ""
echo "ขั้นตอนถัดไป (บน VM):"
echo "  git clone <repo> /var/www/adwaresource"
echo "  cd /var/www/adwaresource && sudo bash deploy/setup-vm.sh"
echo "  cp deploy/env.example .env && nano .env"
echo "  bash deploy/deploy.sh"
