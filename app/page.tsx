export const dynamic = "force-dynamic"; // This disables SSG and ISR

import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import SplitText from "./components/SplitText";
import ScrollLinked from "./components/ScrollLinked";
import ScrollLinkedService from "./components/ScrollLinkedService";
import Footer from "./Footer";

export default async function Home() {
  if (
    !process.env.DATABASE_URL ||
    process.env.DATABASE_URL ===
      "prisma+postgres://accelerate.prisma-data.net/?api_key=API_KEY"
  ) {
    redirect("/setup");
  }

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="h-screen bg-gradient-to-br from-[#D5C9F4] to-white">
      {/* Hero Section */}

      <ScrollLinked />

      <ScrollLinkedService />

      {/* About Section */}
      <section className="py-20 bg-[#D5C9F4]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#222222] mb-6">
                เกี่ยวกับเรา
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                เราเป็นบริษัทบัญชีที่มีประสบการณ์มากกว่า 15 ปี
                ให้บริการลูกค้าทั่วประเทศ
                ด้วยทีมงานที่มีความเชี่ยวชาญและเทคโนโลยีที่ทันสมัย
              </p>
              <div className="text-center text-gray-700">
                
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#512E8C] mb-2">
                    500+
                  </div>
                  <div className="text-gray-700">ลูกค้าที่ไว้วางใจ</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#512E8C] mb-2">
                    15+
                  </div>
                  <div className="text-gray-700">ปีประสบการณ์</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#512E8C] mb-2">
                    24/7
                  </div>
                  <div className="text-gray-700">บริการสนับสนุน</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#512E8C] mb-2">
                    100%
                  </div>
                  <div className="text-gray-700">ความพึงพอใจ</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#512E8C] to-[#7F4FC3] p-8 rounded-xl text-white">
              <h3 className="text-2xl font-semibold mb-6">ทำไมต้องเลือกเรา?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#D5C9F4] mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>ทีมงานที่มีประสบการณ์และใบอนุญาต</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#D5C9F4] mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>เทคโนโลยีล่าสุดเพื่อความแม่นยำ</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#D5C9F4] mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>บริการครบวงจรในราคาที่เป็นธรรม</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#D5C9F4] mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>การสนับสนุนตลอด 24 ชั่วโมง</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#222222] mb-4">ติดต่อเรา</h2>
          <p className="text-xl text-gray-600 mb-12">
            พร้อมให้คำปรึกษาและบริการคุณ
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#512E8C] rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#222222] mb-2">
                โทรศัพท์
              </h3>
              <p className="text-gray-600">
                <a href="tel:0809155595">080 915 5595</a>
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#7F4FC3] rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#222222] mb-2">
                อีเมล
              </h3>
              <p className="text-gray-600">
                <a href="mailto:adwares.consulting@gmail.com">
                  adwares.consulting@gmail.com
                </a>
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#512E8C] rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#222222] mb-2">
                ที่อยู่
              </h3>
              <p className="text-gray-600">
                3336 อาคารเดอะพลิมเพลส ห้อง 1/203 ชั้น 2 ถนนพหลโยธิน แขวงจอมพล
                เขตจตุจักร กรุงเทพมหานคร 10900
              </p>
            </div>
          </div>

          <button className="bg-[#512E8C] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#7F4FC3] transition-colors">
            นัดหมายปรึกษาฟรี
          </button>
        </div>
      </section>
      <section className="py-20 bg-white">พันธมิตร</section>

      <Footer />
    </div>
  );
}
