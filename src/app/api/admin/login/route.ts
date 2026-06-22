import { NextResponse } from "next/server";
import { signSession } from "../../../../lib/auth";
import { writeAuditLog } from "../../../../lib/audit";
import { prisma } from "../../../../lib/db";
import { verifyPassword } from "../../../../lib/password";
import { getClientIp } from "../../../../lib/request";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();

    if (!normalizedEmail || !password) {
      return NextResponse.json(
        { message: "กรุณากรอกอีเมลและรหัสผ่าน" },
        { status: 400 }
      );
    }

    const user = await prisma.adminUser.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user || !user.active || !verifyPassword(password, user.password)) {
      return NextResponse.json(
        { message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    const loginIp = getClientIp(request);
    const token = await signSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role as "MAKER" | "CHECKER" | "APPROVER" | "SUPER_ADMIN",
      loginIp,
    });

    const sessionUser = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role as "MAKER" | "CHECKER" | "APPROVER" | "SUPER_ADMIN",
      loginIp,
    };

    await writeAuditLog({
      user: sessionUser,
      action: "LOGIN",
      metadata: { email: user.email },
      ipAddress: loginIp,
    });

    const response = NextResponse.json({
      message: "เข้าสู่ระบบสำเร็จ",
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
        loginIp,
      },
    });

    response.cookies.set({
      name: "admin_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 28800,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" },
      { status: 500 }
    );
  }
}
