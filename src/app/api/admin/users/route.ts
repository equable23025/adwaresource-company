import { NextResponse } from "next/server";
import { writeAuditLog } from "../../../../lib/audit";
import { getSessionUser } from "../../../../lib/auth";
import { prisma } from "../../../../lib/db";
import { hashPassword } from "../../../../lib/password";
import { canManageUsers } from "../../../../lib/permissions";
import { isRole } from "../../../../lib/roles";

function forbidden() {
  return NextResponse.json({ message: "ไม่มีสิทธิ์ดำเนินการนี้" }, { status: 403 });
}

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!canManageUsers(user.role)) {
      return forbidden();
    }

    const users = await prisma.adminUser.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("GET users error:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!canManageUsers(user.role)) {
      return forbidden();
    }

    const { email, name, password, role } = await request.json();
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();

    if (!normalizedEmail || !name || !password || !role) {
      return NextResponse.json({ message: "ข้อมูลไม่ครบถ้วน" }, { status: 400 });
    }

    if (!isRole(role)) {
      return NextResponse.json({ message: "Role ไม่ถูกต้อง" }, { status: 400 });
    }

    const created = await prisma.adminUser.create({
      data: {
        email: normalizedEmail,
        name: String(name).trim(),
        password: hashPassword(password),
        role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    await writeAuditLog({
      user,
      action: "CREATE_USER",
      entityType: "USER",
      entityId: created.id,
      metadata: { email: created.email, role: created.role },
    });

    return NextResponse.json({ message: "สร้างผู้ใช้สำเร็จ", user: created });
  } catch (error) {
    console.error("POST users error:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการสร้างผู้ใช้" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!canManageUsers(user.role)) {
      return forbidden();
    }

    const { userId, name, role, active, password } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: "ข้อมูลไม่ครบถ้วน (userId)" }, { status: 400 });
    }

    if (role && !isRole(role)) {
      return NextResponse.json({ message: "Role ไม่ถูกต้อง" }, { status: 400 });
    }

    const updated = await prisma.adminUser.update({
      where: { id: userId },
      data: {
        ...(name !== undefined ? { name: String(name).trim() } : {}),
        ...(role !== undefined ? { role } : {}),
        ...(active !== undefined ? { active: Boolean(active) } : {}),
        ...(password ? { password: hashPassword(password) } : {}),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    await writeAuditLog({
      user,
      action: "UPDATE_USER",
      entityType: "USER",
      entityId: userId,
      metadata: { email: updated.email, role: updated.role, active: updated.active },
    });

    return NextResponse.json({ message: "อัปเดตผู้ใช้สำเร็จ", user: updated });
  } catch (error) {
    console.error("PATCH users error:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการอัปเดตผู้ใช้" },
      { status: 500 }
    );
  }
}
