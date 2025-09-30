"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Footer from "../Footer";

export default function About() {
  return (
    <div className="h-screen bg-gradient-to-br from-[#D5C9F4] to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#512E8C] to-[#7F4FC3] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">เกี่ยวกับเรา</h1>
          <p className="text-xl md:text-2xl text-[#D5C9F4] max-w-3xl mx-auto">
            แอดแวร์ซอร์ส คอนซัลติ้ง จำกัด<br />
            ADWARESOURCE CONSULTING CO., LTD.
          </p>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-[#222222] mb-6">ข้อมูลบริษัท</h2>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#D5C9F4] to-white p-6 rounded-xl border-l-4 border-[#512E8C]">
                  <h3 className="text-xl font-semibold text-[#512E8C] mb-3">ชื่อบริษัท</h3>
                  <p className="text-lg text-[#222222] mb-2">แอดแวร์ซอร์ส คอนซัลติ้ง จำกัด</p>
                  <p className="text-lg text-[#7F4FC3] font-medium">ADWARESOURCE CONSULTING CO., LTD.</p>
                </div>

                <div className="bg-gradient-to-r from-[#D5C9F4] to-white p-6 rounded-xl border-l-4 border-[#7F4FC3]">
                  <h3 className="text-xl font-semibold text-[#512E8C] mb-3">หมวดธุรกิจ</h3>
                  <p className="text-gray-700">
                    กิจกรรมเกี่ยวกับบัญชีการทำบัญชีและการตรวจสอบบัญชี การให้คำปรึกษาด้านภาษี
                  </p>
                </div>

                <div className="bg-gradient-to-r from-[#D5C9F4] to-white p-6 rounded-xl border-l-4 border-[#512E8C]">
                  <h3 className="text-xl font-semibold text-[#512E8C] mb-3">วิสัยทัศน์</h3>
                  <p className="text-gray-700">
                    เป็นบริษัทที่ให้บริการด้านบัญชี การตรวจสอบบัญชี และการให้คำปรึกษาด้านภาษี 
                    ที่มีมาตรฐานสูงและน่าเชื่อถือ เพื่อช่วยให้ธุรกิจของลูกค้าเติบโตอย่างยั่งยืน
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#222222] mb-6">บริการหลัก</h2>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-white rounded-lg shadow-md border border-[#D5C9F4]">
                  <div className="w-12 h-12 bg-[#512E8C] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#222222] mb-2">กิจกรรมเกี่ยวกับบัญชี</h3>
                    <p className="text-gray-600">การทำบัญชีแยกประเภท งบการเงิน และรายงานทางการเงิน</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-md border border-[#D5C9F4]">
                  <div className="w-12 h-12 bg-[#7F4FC3] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#222222] mb-2">การตรวจสอบบัญชี (Audit)</h3>
                    <p className="text-gray-600">การตรวจสอบและรับรองงบการเงินตามมาตรฐานการสอบบัญชี</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-md border border-[#D5C9F4]">
                  <div className="w-12 h-12 bg-[#512E8C] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#222222] mb-2">การให้คำปรึกษาด้านภาษี</h3>
                    <p className="text-gray-600">คำปรึกษาและบริการด้านภาษีเงินได้ ภาษีมูลค่าเพิ่ม และภาษีอื่นๆ</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-md border border-[#D5C9F4]">
                  <div className="w-12 h-12 bg-[#7F4FC3] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#222222] mb-2">การตลาดและการให้คำปรึกษาธุรกิจ</h3>
                    <p className="text-gray-600">คำปรึกษาด้านการตลาดและกลยุทธ์ทางธุรกิจ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#222222] text-center mb-12">สถิติของเรา</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#512E8C] mb-2">500+</div>
              <div className="text-gray-700">ลูกค้าที่ไว้วางใจ</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#512E8C] mb-2">15+</div>
              <div className="text-gray-700">ปีประสบการณ์</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#512E8C] mb-2">24/7</div>
              <div className="text-gray-700">บริการสนับสนุน</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#512E8C] mb-2">100%</div>
              <div className="text-gray-700">ความพึงพอใจ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#222222] mb-6">ติดต่อเรา</h2>
          <p className="text-xl text-gray-600 mb-12">พร้อมให้คำปรึกษาและบริการคุณ</p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#512E8C] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#222222] mb-2">โทรศัพท์</h3>
              <p className="text-gray-600"><a href="tel:0809155595">080 915 5595</a></p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#7F4FC3] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#222222] mb-2">อีเมล</h3>
              <p className="text-gray-600"><a href="mailto:adwares.consulting@gmail.com">adwares.consulting@gmail.com</a></p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#512E8C] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#222222] mb-2">ที่อยู่</h3>
              <p className="text-gray-600">3336 อาคารเดอะพลิมเพลส ห้อง 1/203 ชั้น 2 ถนนพหลโยธิน แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-8 py-3 bg-[#7F4FC3] text-white rounded-lg font-semibold hover:bg-[#512E8C] transition-colors">
              นัดหมายปรึกษาฟรี
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
