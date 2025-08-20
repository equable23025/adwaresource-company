"use client";

import { motion, useScroll, useTransform } from "motion/react";

export default function ScrollLinked() {
  const { scrollYProgress } = useScroll();
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [1, 2, 1]);

  return (
    <>
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className=""
        >
        <section className="py-20 bg-white h-full flex align-items-center">
        <div className="max-w-10xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#222222] mb-4">
              บริการของเรา
            </h2>
            <p className="text-xl text-gray-600">
              บริการบัญชีครบวงจรสำหรับธุรกิจทุกขนาด
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {/* Service Card 1 */}
            <div className="bg-gradient-to-br from-[#D5C9F4] to-white p-8 rounded-xl hover:shadow-lg transition-shadow border border-[#D5C9F4]">
              <div className="w-16 h-16 bg-[#512E8C] rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#222222] mb-4">
                บัญชีทั่วไป
              </h3>
              <p className="text-gray-600 mb-6">
                บริการจัดทำบัญชี งบการเงิน และรายงานภาษีประจำปี
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• จัดทำบัญชีแยกประเภท</li>
                <li>• งบกำไรขาดทุน</li>
                <li>• งบดุล</li>
              </ul>
            </div>

            {/* Service Card 2 */}
            <div className="bg-gradient-to-br from-[#D5C9F4] to-white p-8 rounded-xl hover:shadow-lg transition-shadow border border-[#D5C9F4]">
              <div className="w-16 h-16 bg-[#7F4FC3] rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#222222] mb-4">
                ภาษี
              </h3>
              <p className="text-gray-600 mb-6">
                บริการด้านภาษีครบวงจร ทั้งภาษีเงินได้และภาษีมูลค่าเพิ่ม
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• ภาษีเงินได้นิติบุคคล</li>
                <li>• ภาษีมูลค่าเพิ่ม</li>
                <li>• ภาษีหัก ณ ที่จ่าย</li>
              </ul>
            </div>

            {/* Service Card 3 */}
            <div className="bg-gradient-to-br from-[#D5C9F4] to-white p-8 rounded-xl hover:shadow-lg transition-shadow border border-[#D5C9F4]">
              <div className="w-16 h-16 bg-[#512E8C] rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#222222] mb-4">
                วิเคราะห์การเงิน
              </h3>
              <p className="text-gray-600 mb-6">
                วิเคราะห์และให้คำแนะนำเพื่อเพิ่มประสิทธิภาพการเงิน
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• วิเคราะห์อัตราส่วนการเงิน</li>
                <li>• วางแผนการเงิน</li>
                <li>• งบประมาณและการควบคุม</li>
              </ul>
            </div>

            {/* Service Card 4 - BOI */}
            <div className="bg-gradient-to-br from-[#D5C9F4] to-white p-8 rounded-xl hover:shadow-lg transition-shadow border border-[#D5C9F4]">
              <div className="w-16 h-16 bg-[#7F4FC3] rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#222222] mb-4">
                รับทำ BOI
              </h3>
              <p className="text-gray-600 mb-6">
                บริการรับทำและให้คำปรึกษาการขอรับส่งเสริมการลงทุนจาก BOI
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• ยื่นคำขอรับส่งเสริมการลงทุน</li>
                <li>• จัดเตรียมเอกสารประกอบ</li>
                <li>• ติดตามสถานะการอนุมัติ</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
        </motion.div>
    </>
  );
}
