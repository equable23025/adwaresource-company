import { ROLES, type Role } from "./roles";

export type SessionUser = {
  userId: string;
  email: string;
  name: string;
  role: Role;
  loginIp: string;
};

export function canDeleteLead(role: Role): boolean {
  return role === ROLES.APPROVER || role === ROLES.SUPER_ADMIN;
}

export function canMarkContacted(_role: Role): boolean {
  return true;
}

export function canEditLeadFields(role: Role): boolean {
  return role === ROLES.APPROVER || role === ROLES.SUPER_ADMIN;
}

export function canAddMakerNote(role: Role): boolean {
  return (
    role === ROLES.MAKER ||
    role === ROLES.APPROVER ||
    role === ROLES.SUPER_ADMIN
  );
}

export function canEditMakerNote(role: Role): boolean {
  return (
    role === ROLES.MAKER ||
    role === ROLES.APPROVER ||
    role === ROLES.SUPER_ADMIN
  );
}

export function canAddCheckerNote(role: Role): boolean {
  return (
    role === ROLES.CHECKER ||
    role === ROLES.APPROVER ||
    role === ROLES.SUPER_ADMIN
  );
}

export function canAddCheckerSummary(role: Role): boolean {
  return (
    role === ROLES.CHECKER ||
    role === ROLES.APPROVER ||
    role === ROLES.SUPER_ADMIN
  );
}

export function canMakerSubmit(role: Role): boolean {
  return role === ROLES.MAKER;
}

export function canCheckerReview(role: Role): boolean {
  return (
    role === ROLES.CHECKER ||
    role === ROLES.APPROVER ||
    role === ROLES.SUPER_ADMIN
  );
}

export function canApproverDecide(role: Role): boolean {
  return role === ROLES.APPROVER || role === ROLES.SUPER_ADMIN;
}

export function canSeePrivateComments(role: Role): boolean {
  return role === ROLES.APPROVER || role === ROLES.SUPER_ADMIN;
}

export function canManageUsers(role: Role): boolean {
  return role === ROLES.SUPER_ADMIN;
}

export function canViewAuditLogs(role: Role): boolean {
  return role === ROLES.APPROVER || role === ROLES.SUPER_ADMIN;
}
