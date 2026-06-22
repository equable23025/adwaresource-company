import { prisma } from "./db";

export async function addWorkflowComment(params: {
  leadId: string;
  action: string;
  decision?: string;
  comment: string;
  visibility: string;
  user: { email: string; role: string };
}) {
  await prisma.leadWorkflowComment.create({
    data: {
      leadId: params.leadId,
      action: params.action,
      decision: params.decision ?? null,
      comment: params.comment.trim(),
      visibility: params.visibility,
      createdBy: params.user.email,
      createdByRole: params.user.role,
    },
  });
}
