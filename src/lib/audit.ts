import { prisma } from "./db";
import type { SessionUser } from "./permissions";

type AuditParams = {
  user: SessionUser;
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
};

export async function writeAuditLog({
  user,
  action,
  entityType,
  entityId,
  metadata,
  ipAddress,
}: AuditParams) {
  await prisma.auditLog.create({
    data: {
      userId: user.userId,
      userEmail: user.email,
      userRole: user.role,
      action,
      entityType,
      entityId,
      metadata: metadata ? JSON.stringify(metadata) : null,
      ipAddress: ipAddress ?? user.loginIp,
    },
  });
}
