import { NextResponse } from "next/server";
import { writeAuditLog } from "../../../../lib/audit";
import { getSessionUser } from "../../../../lib/auth";
import { prisma } from "../../../../lib/db";
import { canViewAuditLogs } from "../../../../lib/permissions";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export async function GET(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!canViewAuditLogs(user.role)) {
      return NextResponse.json({ message: "ไม่มีสิทธิ์ดำเนินการนี้" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.min(
      Math.max(1, Number(searchParams.get("limit") || DEFAULT_LIMIT)),
      MAX_LIMIT
    );
    const skip = (page - 1) * limit;

    const [total, logs] = await Promise.all([
      prisma.auditLog.count(),
      prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
    ]);

    if (page === 1) {
      await writeAuditLog({
        user,
        action: "VIEW_AUDIT_LOGS",
        entityType: "AUDIT_LOG",
        metadata: { page, limit, total },
      });
    }

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return NextResponse.json({
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasPrev: page > 1,
        hasNext: page < totalPages,
      },
    });
  } catch (error) {
    console.error("GET audit logs error:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึง audit log" },
      { status: 500 }
    );
  }
}
