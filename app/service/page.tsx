"use client";

import { motion } from "framer-motion";

export default function ServicePage() {
  const services = [
    {
      title: "การให้คำปรึกษาด้านการตลาดดิจิทัล",
      description: "บริการให้คำปรึกษาและวางแผนกลยุทธ์การตลาดดิจิทัลที่ครบวงจร เพื่อเพิ่มประสิทธิภาพในการเข้าถึงลูกค้าและเพิ่มยอดขาย",
      icon: "📈",
      features: [
        "การวิเคราะห์ตลาดและคู่แข่ง",
        "การวางแผนกลยุทธ์การตลาดดิจิทัล",
        "การจัดการโซเชียลมีเดีย",
        "การวิเคราะห์ข้อมูลและรายงานผล"
      ]
    },
    {
      title: "การพัฒนาเว็บไซต์และแอปพลิเคชัน",
      description: "บริการออกแบบและพัฒนาเว็บไซต์ แอปพลิเคชัน และระบบดิจิทัลที่ทันสมัย ใช้งานง่าย และตอบโจทย์ธุรกิจ",
      icon: "💻",
      features: [
        "การออกแบบ UI/UX ที่ทันสมัย",
        "การพัฒนาเว็บไซต์แบบ Responsive",
        "การพัฒนาแอปพลิเคชันมือถือ",
        "การบำรุงรักษาและอัปเดตระบบ"
      ]
    },
    {
      title: "การจัดการระบบฐานข้อมูล",
      description: "บริการออกแบบ จัดการ และบำรุงรักษาระบบฐานข้อมูลที่ปลอดภัยและมีประสิทธิภาพสูง",
      icon: "🗄️",
      features: [
        "การออกแบบโครงสร้างฐานข้อมูล",
        "การจัดการข้อมูลและการสำรองข้อมูล",
        "การรักษาความปลอดภัยข้อมูล",
        "การปรับปรุงประสิทธิภาพระบบ"
      ]
    },
    {
      title: "การฝึกอบรมและให้คำปรึกษา",
      description: "บริการฝึกอบรมบุคลากรและให้คำปรึกษาด้านเทคโนโลยีสารสนเทศเพื่อเพิ่มประสิทธิภาพการทำงาน",
      icon: "🎓",
      features: [
        "การฝึกอบรมการใช้เทคโนโลยี",
        "การให้คำปรึกษาด้าน IT",
        "การวางแผนระบบเทคโนโลยี",
        "การสนับสนุนทางเทคนิค"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D5C9F4] to-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#512E8C] mb-4 md:mb-6"
          >
            บริการของเรา
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-[#7F4FC3] mb-8 md:mb-12 max-w-3xl mx-auto px-4"
          >
            Adwaresource Consulting มุ่งมั่นให้บริการด้านเทคโนโลยีและดิจิทัลที่ครบวงจร 
            เพื่อช่วยให้ธุรกิจของคุณเติบโตและประสบความสำเร็จในยุคดิจิทัล
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-100"
              >
                <div className="text-3xl md:text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-[#512E8C] mb-3 md:mb-4">{service.title}</h3>
                <p className="text-[#7F4FC3] mb-4 md:mb-6 leading-relaxed text-sm md:text-base">{service.description}</p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#512E8C] mb-2 md:mb-3 text-sm md:text-base">บริการที่รวมอยู่:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-[#7F4FC3] text-sm md:text-base">
                        <span className="w-2 h-2 bg-[#512E8C] rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-gradient-to-r from-[#512E8C] to-[#7F4FC3]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6"
          >
            พร้อมที่จะเริ่มต้นโปรเจกต์ของคุณแล้วหรือยัง?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-[#D5C9F4] mb-6 md:mb-8 px-4"
          >
            ติดต่อเราเพื่อปรึกษาและรับข้อเสนอแนะที่เหมาะสมกับธุรกิจของคุณ
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white text-[#512E8C] px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-[#D5C9F4] transition-all duration-300 font-semibold text-base md:text-lg"
          >
            ติดต่อเรา
          </motion.button>
        </div>
      </section>
    </div>
  );
}
