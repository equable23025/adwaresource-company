export const ROLES = {
  MAKER: "MAKER",
  CHECKER: "CHECKER",
  APPROVER: "APPROVER",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<Role, string> = {
  MAKER: "Maker",
  CHECKER: "Checker",
  APPROVER: "Approver",
  SUPER_ADMIN: "Super Admin",
};

export const LEAD_STATUSES = {
  NEW: "NEW",
  CONTACTED: "CONTACTED",
  PENDING_REVIEW: "PENDING_REVIEW",
  PENDING_APPROVAL: "PENDING_APPROVAL",
  RETURNED_TO_MAKER: "RETURNED_TO_MAKER",
  ENDED: "ENDED",
  CLOSED: "CLOSED",
} as const;

export type LeadStatus = (typeof LEAD_STATUSES)[keyof typeof LEAD_STATUSES];

export const STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: "รอดำเนินการ",
  CONTACTED: "ติดต่อแล้ว",
  PENDING_REVIEW: "รอตรวจสอบ",
  PENDING_APPROVAL: "รออนุมัติ",
  RETURNED_TO_MAKER: "ตีกลับแก้ไข",
  ENDED: "จบงาน",
  CLOSED: "ปิดงานสำเร็จ",
};

export const WORKFLOW_DECISIONS = {
  END_WORK: "END_WORK",
  REVISE: "REVISE",
} as const;

export type WorkflowDecision =
  (typeof WORKFLOW_DECISIONS)[keyof typeof WORKFLOW_DECISIONS];

export const DECISION_LABELS: Record<WorkflowDecision, string> = {
  END_WORK: "จบงาน",
  REVISE: "แก้งาน (ตีกลับ Maker)",
};

export const COMMENT_VISIBILITY = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
} as const;

export function isRole(value: string): value is Role {
  return Object.values(ROLES).includes(value as Role);
}

export function isWorkflowDecision(value: string): value is WorkflowDecision {
  return Object.values(WORKFLOW_DECISIONS).includes(value as WorkflowDecision);
}

export function statusToCssClass(status: string) {
  return status.toLowerCase().replace(/_/g, "-");
}
