"use client";

import { motion, useScroll, useTransform } from "motion/react";
import SplitText from "./SplitText";

export default function ScrollLinked() {
  const { scrollYProgress } = useScroll();
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [1, 2, 1]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className=""
      >
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-[#512E8C] to-[#7F4FC3] text-white overflow-hidden">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
          {/* <SplitText text="ADWARESOURCE CONSULTING CO., LTD." /> */}
          {/* Content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <SplitText text="บริการบัญชีที่เชื่อถือได้" />
            </h1>
            <div className="text-xl md:text-2xl mb-8 text-[#D5C9F4]">
              <SplitText text="ให้คำปรึกษาด้านบัญชีและการเงิน เพื่อธุรกิจที่เติบโตอย่างยั่งยืน" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#512E8C] px-8 py-3 rounded-lg font-semibold hover:bg-[#D5C9F4] transition-colors">
                ปรึกษาฟรี
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#512E8C] transition-colors">
                ดูบริการของเรา
              </button>
            </div>
          </div>

          {/* Background decoration */}
        </section>
      </motion.div>
    </>
  );
}
