"use client";

import Link from "next/link";
import { useState } from "react";
import Footer from "../Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#D5C9F4] to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#512E8C] to-[#7F4FC3] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">ติดต่อเรา</h1>
          <p className="text-xl md:text-2xl text-[#D5C9F4] max-w-3xl mx-auto">
            แอดแวร์ซอร์ส คอนซัลติ้ง จำกัด<br />
            พร้อมให้คำปรึกษาและบริการคุณ
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Company Information */}
            <div>
              <h2 className="text-3xl font-bold text-[#222222] mb-8">ข้อมูลติดต่อ</h2>
              
              <div className="space-y-6">

                <div className="bg-gradient-to-r from-[#D5C9F4] to-white p-6 rounded-xl border-l-4 border-[#512E8C]">
                  <h3 className="text-xl font-semibold text-[#512E8C] mb-3">ที่อยู่</h3>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-[#7F4FC3] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-700">
                      3336 อาคารเดอะพลิมเพลส ห้อง 1/203 ชั้น 2 ถนนพหลโยธิน แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#D5C9F4] to-white p-6 rounded-xl border-l-4 border-[#7F4FC3]">
                  <h3 className="text-xl font-semibold text-[#512E8C] mb-3">ข้อมูลติดต่อ</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-[#7F4FC3] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-700"><a href="tel:0809155595">080 915 5595</a></span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-[#7F4FC3] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700"><a href="mailto:adwares.consulting@gmail.com">adwares.consulting@gmail.com</a></span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#D5C9F4] to-white p-6 rounded-xl border-l-4 border-[#512E8C]">
                  <h3 className="text-xl font-semibold text-[#512E8C] mb-3">เวลาทำการ</h3>
                  <p className="text-gray-700">จันทร์ - ศุกร์: 09:00 - 18:00 น.</p>
                  <p className="text-gray-700">เสาร์ - อาทิตย์: ปิดทำการ</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#222222] mb-8">ส่งข้อความถึงเรา</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อ-นามสกุล *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#512E8C] focus:border-transparent"
                      placeholder="กรอกชื่อ-นามสกุล"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      อีเมล *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#512E8C] focus:border-transparent"
                      placeholder="กรอกอีเมล"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#512E8C] focus:border-transparent"
                      placeholder="กรอกเบอร์โทรศัพท์"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อบริษัท
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#512E8C] focus:border-transparent"
                      placeholder="กรอกชื่อบริษัท"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    ข้อความ *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#512E8C] focus:border-transparent"
                    placeholder="กรอกรายละเอียดที่ต้องการติดต่อ..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#512E8C] text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-[#7F4FC3] transition-colors"
                >
                  ส่งข้อความ
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#D5C9F4]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#222222] text-center mb-12">บริการของเรา</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-[#512E8C] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#222222] mb-2">บัญชีทั่วไป</h3>
              <p className="text-gray-600 text-sm">บริการจัดทำบัญชี งบการเงิน และรายงานภาษีประจำปี</p>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-[#7F4FC3] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#222222] mb-2">ภาษี</h3>
              <p className="text-gray-600 text-sm">บริการด้านภาษีครบวงจร ทั้งภาษีเงินได้และภาษีมูลค่าเพิ่ม</p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-[#512E8C] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#222222] mb-2">วิเคราะห์การเงิน</h3>
              <p className="text-gray-600 text-sm">วิเคราะห์และให้คำแนะนำเพื่อเพิ่มประสิทธิภาพการเงิน</p>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-[#7F4FC3] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#222222] mb-2">รับทำ BOI</h3>
              <p className="text-gray-600 text-sm">บริการรับทำและให้คำปรึกษาการขอรับส่งเสริมการลงทุนจาก BOI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-[#D5C9F4]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#222222] text-center mb-12">แผนที่สำนักงาน</h2>
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-600">แผนที่ Google Maps</p>
                <p className="text-sm text-gray-500">3336 อาคารเดอะพลิมเพลส ห้อง 1/203 ชั้น 2 ถนนพหลโยธิน แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900</p>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <Footer />
    </div>
  );
}
