"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "./components/images/2568-08-20 16.45.43.jpg";

export default function Footer() {
  const [dbConfigured, setDbConfigured] = useState(true);

  useEffect(() => {
    const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;
    if (
      !databaseUrl ||
      databaseUrl ===
        "prisma+postgres://accelerate.prisma-data.net/?api_key=API_KEY"
    ) {
      setDbConfigured(false);
    }
  }, []);

  return (
    <footer className="bg-[#222222] text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#D5C9F4]">
              บริษัท แอดแวร์ซอร์ส คอนซัลติ้ง จำกัด
            </h3>
            <p className="text-gray-300">
              เลขทะเบียน 0135566013570
            </p>
            <p className="text-gray-300">
              บริการบัญชีครบวงจร เพื่อธุรกิจที่เติบโตอย่างยั่งยืน
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#D5C9F4]">บริการ</h4>
            <ul className="space-y-2 text-gray-300">
              <li>บัญชีทั่วไป</li>
              <li>ภาษี</li>
              <li>วิเคราะห์การเงิน</li>
              <li>ตรวจสอบบัญชี</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#D5C9F4]">บริษัท</h4>
            <ul className="space-y-2 text-gray-300">
              <li>เกี่ยวกับเรา</li>
              <li>ทีมงาน</li>
              <li>ข่าวสาร</li>
              <li>ติดต่อ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#D5C9F4]">ติดต่อ</h4>
            <ul className="space-y-2 text-gray-300">
              <li>โทร: 080 915 5595</li>
              <li>อีเมล: adwares.consulting@gmail.com</li>
              <li>
                ที่อยู่: 3336 อาคารเดอะพลิมเพลส ห้อง 1/203 ชั้น 2 ถนนพหลโยธิน แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 p-8 text-center text-gray-300">
          <p className="rad-footer__copyright">
            &copy; 2025 adwaresource consulting co., ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
