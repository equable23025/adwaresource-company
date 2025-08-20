# AdwareSource Company Website

เว็บไซต์บริษัท AdwareSource ที่สร้างด้วย Next.js 15, React 19, และ Prisma

## การตั้งค่าสำหรับ Netlify Deployment

### ข้อกำหนด
- Node.js 20+
- npm (ไม่ใช้ yarn)
- Prisma PostgreSQL database

### Environment Variables ที่ต้องการ
สร้างไฟล์ `.env` ในโฟลเดอร์ root:

```env
DATABASE_URL="your_postgresql_database_url"
```

### การติดตั้ง Dependencies
```bash
npm install
```

### การ Build
```bash
npm run build
```

### การรัน Development Server
```bash
npm run dev
```

## การแก้ไขปัญหา Netlify Build

หากพบปัญหา "Failed during stage 'Install dependencies'" ให้ตรวจสอบ:

1. **Node.js Version**: ใช้ Node.js 20+ (ระบุใน `.nvmrc` และ `netlify.toml`)
2. **Package Manager**: ใช้ npm แทน yarn (ลบ `yarn.lock` ออก)
3. **Prisma Version**: ตรวจสอบให้แน่ใจว่า `prisma` และ `@prisma/client` มี version เดียวกัน
4. **Build Script**: ปรับปรุงแล้วให้รัน `prisma generate` ก่อน build

## โครงสร้างโปรเจค

```
adwaresource-company/
├── app/                    # Next.js App Router
├── prisma/                 # Prisma schema และ migrations
├── lib/                    # Utility functions
├── netlify.toml           # Netlify configuration
├── .nvmrc                 # Node.js version
├── .npmrc                 # npm configuration
└── package.json           # Dependencies และ scripts
```

## การ Deploy บน Netlify

1. เชื่อมต่อ repository กับ Netlify
2. ตั้งค่า build command: `npm run build`
3. ตั้งค่า publish directory: `.next`
4. เพิ่ม environment variable `DATABASE_URL`
5. Deploy!
