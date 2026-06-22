import type { Role } from "./roles";
import { workflowCommentsFilter, serializeWorkflowComments } from "./workflow";
import { prisma } from "./db";

type LeadWithComments = {
  id: string;
  fullName: string;
  contactInfo: string;
  businessName: string | null;
  service: string;
  details: string | null;
  status: string;
  makerNote: string | null;
  makerNoteBy: string | null;
  makerNoteAt: Date | null;
  checkerNote: string | null;
  checkerNoteBy: string | null;
  checkerNoteAt: Date | null;
  checkerSummary: string | null;
  checkerSummaryBy: string | null;
  checkerSummaryAt: Date | null;
  closedBy: string | null;
  closedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  workflowComments: Array<{
    id: string;
    leadId: string;
    action: string;
    decision: string | null;
    comment: string;
    visibility: string;
    createdBy: string;
    createdByRole: string;
    createdAt: Date;
  }>;
};

export function serializeLead(lead: LeadWithComments) {
  const { workflowComments, ...rest } = lead;
  return {
    ...rest,
    makerNoteAt: rest.makerNoteAt?.toISOString() ?? null,
    checkerNoteAt: rest.checkerNoteAt?.toISOString() ?? null,
    checkerSummaryAt: rest.checkerSummaryAt?.toISOString() ?? null,
    closedAt: rest.closedAt?.toISOString() ?? null,
    createdAt: rest.createdAt.toISOString(),
    updatedAt: rest.updatedAt.toISOString(),
    workflowComments: serializeWorkflowComments(workflowComments),
  };
}

export async function getLeadsForRole(role: Role) {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      workflowComments: {
        where: workflowCommentsFilter(role),
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return leads.map((lead) => serializeLead(lead as LeadWithComments));
}

export async function getLeadForRole(leadId: string, role: Role) {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: {
      workflowComments: {
        where: workflowCommentsFilter(role),
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!lead) return null;
  return serializeLead(lead as LeadWithComments);
}
