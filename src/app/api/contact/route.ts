import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, contactInfo, businessName, service, details } = body;

    // Simple validation
    if (!fullName || !contactInfo) {
      return NextResponse.json(
        { message: "กรุณากรอกข้อมูล ชื่อ-นามสกุล และ เบอร์โทร/LINE ID ที่จำเป็น" },
        { status: 400 }
      );
    }

    // Save lead to database
    const lead = await prisma.lead.create({
      data: {
        fullName: fullName.trim(),
        contactInfo: contactInfo.trim(),
        businessName: businessName ? businessName.trim() : null,
        service: service || "ไม่ได้ระบุบริการ",
        details: details ? details.trim() : null,
        status: "NEW",
      },
    });

    return NextResponse.json(
      { message: "ส่งข้อมูลสำเร็จ", leadId: lead.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดภายในระบบ กรุณาลองใหม่อีกครั้งภายหลัง" },
      { status: 500 }
    );
  }
}
