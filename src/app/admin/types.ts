export type Role = "MAKER" | "CHECKER" | "APPROVER" | "SUPER_ADMIN";

export type SessionUser = {
  userId: string;
  email: string;
  name: string;
  role: Role;
  roleLabel: string;
  loginIp: string;
};

export type WorkflowComment = {
  id: string;
  leadId: string;
  action: string;
  decision: string | null;
  comment: string;
  visibility: string;
  createdBy: string;
  createdByRole: string;
  createdAt: string;
};

export type Lead = {
  id: string;
  fullName: string;
  contactInfo: string;
  businessName: string | null;
  service: string;
  details: string | null;
  status: string;
  makerNote: string | null;
  makerNoteBy: string | null;
  makerNoteAt: string | null;
  checkerNote: string | null;
  checkerNoteBy: string | null;
  checkerNoteAt: string | null;
  checkerSummary: string | null;
  checkerSummaryBy: string | null;
  checkerSummaryAt: string | null;
  closedBy: string | null;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
  workflowComments: WorkflowComment[];
};

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AuditLog = {
  id: string;
  userId: string | null;
  userEmail: string;
  userRole: string;
  action: string;
  entityType: string | null;
  entityId: string | null;
  metadata: string | null;
  ipAddress: string | null;
  createdAt: string;
};
