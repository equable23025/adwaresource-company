import type { Role } from "./roles";
import { COMMENT_VISIBILITY } from "./roles";
import { canSeePrivateComments } from "./permissions";

export function workflowCommentsFilter(role: Role) {
  if (canSeePrivateComments(role)) {
    return {};
  }
  return { visibility: COMMENT_VISIBILITY.PUBLIC };
}

export function serializeWorkflowComments(
  comments: Array<{
    id: string;
    leadId: string;
    action: string;
    decision: string | null;
    comment: string;
    visibility: string;
    createdBy: string;
    createdByRole: string;
    createdAt: Date;
  }>
) {
  return comments.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));
}
