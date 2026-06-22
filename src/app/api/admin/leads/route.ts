import { NextResponse } from "next/server";
import { writeAuditLog } from "../../../../lib/audit";
import { getSessionUser } from "../../../../lib/auth";
import { prisma } from "../../../../lib/db";
import { getLeadForRole, getLeadsForRole } from "../../../../lib/leads";
import {
  canAddCheckerNote,
  canAddCheckerSummary,
  canAddMakerNote,
  canApproverDecide,
  canCheckerReview,
  canDeleteLead,
  canEditLeadFields,
  canEditMakerNote,
  canMakerSubmit,
  canMarkContacted,
} from "../../../../lib/permissions";
import {
  COMMENT_VISIBILITY,
  LEAD_STATUSES,
  WORKFLOW_DECISIONS,
  isWorkflowDecision,
} from "../../../../lib/roles";
import { addWorkflowComment } from "../../../../lib/workflow-comments";

function forbidden(message = "ไม่มีสิทธิ์ดำเนินการนี้") {
  return NextResponse.json({ message }, { status: 403 });
}

const MAKER_SUBMIT_STATUSES = [
  LEAD_STATUSES.CONTACTED,
  LEAD_STATUSES.RETURNED_TO_MAKER,
  LEAD_STATUSES.NEW,
];

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const leads = await getLeadsForRole(user.role);

    await writeAuditLog({
      user,
      action: "VIEW_LEADS",
      entityType: "LEAD",
      metadata: { count: leads.length },
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("GET leads error:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูล" },
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

    const body = await request.json();
    const { leadId, action } = body;

    if (!leadId || !action) {
      return NextResponse.json(
        { message: "ข้อมูลไม่ครบถ้วน (leadId, action)" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) {
      return NextResponse.json({ message: "ไม่พบข้อมูลลีด" }, { status: 404 });
    }

    switch (action) {
      case "mark_contacted": {
        if (!canMarkContacted(user.role)) return forbidden();

        if (lead.status !== LEAD_STATUSES.NEW && lead.status !== LEAD_STATUSES.RETURNED_TO_MAKER) {
          return NextResponse.json(
            { message: "สถานะปัจจุบันไม่สามารถบันทึกการติดต่อได้" },
            { status: 400 }
          );
        }

        await prisma.lead.update({
          where: { id: leadId },
          data: { status: LEAD_STATUSES.CONTACTED },
        });
        await writeAuditLog({
          user,
          action: "MARK_CONTACTED",
          entityType: "LEAD",
          entityId: leadId,
          metadata: { from: lead.status, to: LEAD_STATUSES.CONTACTED },
        });
        break;
      }

      case "update_status": {
        const { status } = body;
        if (!status || !Object.values(LEAD_STATUSES).includes(status)) {
          return NextResponse.json({ message: "สถานะไม่ถูกต้อง" }, { status: 400 });
        }
        if (!canEditLeadFields(user.role)) return forbidden();

        await prisma.lead.update({ where: { id: leadId }, data: { status } });
        await writeAuditLog({
          user,
          action: "UPDATE_STATUS",
          entityType: "LEAD",
          entityId: leadId,
          metadata: { from: lead.status, to: status },
        });
        break;
      }

      case "add_maker_note": {
        if (!canAddMakerNote(user.role)) return forbidden();
        const { note } = body;
        if (!note?.trim()) {
          return NextResponse.json({ message: "กรุณากรอกรายละเอียด" }, { status: 400 });
        }
        if (lead.makerNote && lead.makerNoteBy !== user.email && !canEditMakerNote(user.role)) {
          return forbidden("ไม่สามารถแก้ไขรายละเอียดของ Maker คนอื่นได้");
        }
        await prisma.lead.update({
          where: { id: leadId },
          data: { makerNote: note.trim(), makerNoteBy: user.email, makerNoteAt: new Date() },
        });
        await writeAuditLog({
          user,
          action: lead.makerNote ? "UPDATE_MAKER_NOTE" : "ADD_MAKER_NOTE",
          entityType: "LEAD",
          entityId: leadId,
        });
        break;
      }

      case "add_checker_note": {
        if (!canAddCheckerNote(user.role)) return forbidden();
        const { note } = body;
        if (!note?.trim()) {
          return NextResponse.json({ message: "กรุณากรอกรายละเอียด" }, { status: 400 });
        }
        await prisma.lead.update({
          where: { id: leadId },
          data: { checkerNote: note.trim(), checkerNoteBy: user.email, checkerNoteAt: new Date() },
        });
        await writeAuditLog({
          user,
          action: lead.checkerNote ? "UPDATE_CHECKER_NOTE" : "ADD_CHECKER_NOTE",
          entityType: "LEAD",
          entityId: leadId,
        });
        break;
      }

      case "add_checker_summary": {
        if (!canAddCheckerSummary(user.role)) return forbidden();
        const { summary } = body;
        if (!summary?.trim()) {
          return NextResponse.json({ message: "กรุณากรอกสรุปรายงาน" }, { status: 400 });
        }
        await prisma.lead.update({
          where: { id: leadId },
          data: {
            checkerSummary: summary.trim(),
            checkerSummaryBy: user.email,
            checkerSummaryAt: new Date(),
          },
        });
        await writeAuditLog({
          user,
          action: lead.checkerSummary ? "UPDATE_CHECKER_SUMMARY" : "ADD_CHECKER_SUMMARY",
          entityType: "LEAD",
          entityId: leadId,
        });
        break;
      }

      case "maker_submit": {
        if (!canMakerSubmit(user.role)) return forbidden();
        if (!MAKER_SUBMIT_STATUSES.includes(lead.status as (typeof MAKER_SUBMIT_STATUSES)[number])) {
          return NextResponse.json(
            { message: "สถานะปัจจุบันไม่สามารถส่งปิดงานได้" },
            { status: 400 }
          );
        }
        const { makerNote } = body;
        if (!makerNote?.trim()) {
          return NextResponse.json({ message: "กรุณากรอกรายละเอียดปิดงาน" }, { status: 400 });
        }
        await prisma.lead.update({
          where: { id: leadId },
          data: {
            status: LEAD_STATUSES.PENDING_REVIEW,
            makerNote: makerNote.trim(),
            makerNoteBy: user.email,
            makerNoteAt: new Date(),
          },
        });
        await addWorkflowComment({
          leadId,
          action: "MAKER_SUBMIT",
          comment: makerNote.trim(),
          visibility: COMMENT_VISIBILITY.PUBLIC,
          user,
        });
        await writeAuditLog({ user, action: "MAKER_SUBMIT", entityType: "LEAD", entityId: leadId });
        break;
      }

      case "checker_pass": {
        if (!canCheckerReview(user.role)) return forbidden();
        if (lead.status !== LEAD_STATUSES.PENDING_REVIEW) {
          return NextResponse.json({ message: "ลีดนี้ไม่อยู่ในสถานะรอตรวจสอบ" }, { status: 400 });
        }
        const { checkerNote, checkerSummary } = body;
        const data: Record<string, unknown> = { status: LEAD_STATUSES.PENDING_APPROVAL };
        if (checkerNote?.trim()) {
          data.checkerNote = checkerNote.trim();
          data.checkerNoteBy = user.email;
          data.checkerNoteAt = new Date();
        }
        if (checkerSummary?.trim()) {
          data.checkerSummary = checkerSummary.trim();
          data.checkerSummaryBy = user.email;
          data.checkerSummaryAt = new Date();
        }
        await prisma.lead.update({ where: { id: leadId }, data });
        const passComment = [checkerNote?.trim(), checkerSummary?.trim()].filter(Boolean).join("\n\n");
        await addWorkflowComment({
          leadId,
          action: "CHECKER_PASS",
          decision: "PASS",
          comment: passComment || "ตรวจสอบผ่าน",
          visibility: COMMENT_VISIBILITY.PUBLIC,
          user,
        });
        await writeAuditLog({ user, action: "CHECKER_PASS", entityType: "LEAD", entityId: leadId });
        break;
      }

      case "checker_reject": {
        if (!canCheckerReview(user.role)) return forbidden();
        if (lead.status !== LEAD_STATUSES.PENDING_REVIEW) {
          return NextResponse.json({ message: "ลีดนี้ไม่อยู่ในสถานะรอตรวจสอบ" }, { status: 400 });
        }
        const { decision, comment } = body;
        if (!isWorkflowDecision(decision)) {
          return NextResponse.json({ message: "กรุณาเลือกจบงานหรือแก้งาน" }, { status: 400 });
        }
        if (!comment?.trim()) {
          return NextResponse.json({ message: "กรุณากรอกความคิดเห็น" }, { status: 400 });
        }
        const nextStatus =
          decision === WORKFLOW_DECISIONS.END_WORK
            ? LEAD_STATUSES.ENDED
            : LEAD_STATUSES.RETURNED_TO_MAKER;
        await prisma.lead.update({ where: { id: leadId }, data: { status: nextStatus } });
        await addWorkflowComment({
          leadId,
          action: "CHECKER_REJECT",
          decision,
          comment: comment.trim(),
          visibility: COMMENT_VISIBILITY.PUBLIC,
          user,
        });
        await writeAuditLog({
          user,
          action: "CHECKER_REJECT",
          entityType: "LEAD",
          entityId: leadId,
          metadata: { decision, nextStatus },
        });
        break;
      }

      case "approver_approve": {
        if (!canApproverDecide(user.role)) return forbidden();
        if (lead.status !== LEAD_STATUSES.PENDING_APPROVAL) {
          return NextResponse.json({ message: "ลีดนี้ไม่อยู่ในสถานะรออนุมัติ" }, { status: 400 });
        }
        await prisma.lead.update({
          where: { id: leadId },
          data: { status: LEAD_STATUSES.CLOSED, closedBy: user.email, closedAt: new Date() },
        });
        await addWorkflowComment({
          leadId,
          action: "APPROVER_APPROVE",
          decision: "APPROVE",
          comment: "อนุมัติปิดงานสำเร็จ",
          visibility: COMMENT_VISIBILITY.PUBLIC,
          user,
        });
        await writeAuditLog({ user, action: "APPROVER_APPROVE", entityType: "LEAD", entityId: leadId });
        break;
      }

      case "approver_reject": {
        if (!canApproverDecide(user.role)) return forbidden();
        if (lead.status !== LEAD_STATUSES.PENDING_APPROVAL) {
          return NextResponse.json({ message: "ลีดนี้ไม่อยู่ในสถานะรออนุมัติ" }, { status: 400 });
        }
        const { decision, comment } = body;
        if (!isWorkflowDecision(decision)) {
          return NextResponse.json({ message: "กรุณาเลือกจบงานหรือแก้งาน" }, { status: 400 });
        }
        if (!comment?.trim()) {
          return NextResponse.json({ message: "กรุณากรอกความคิดเห็น" }, { status: 400 });
        }
        const nextStatus =
          decision === WORKFLOW_DECISIONS.END_WORK
            ? LEAD_STATUSES.ENDED
            : LEAD_STATUSES.RETURNED_TO_MAKER;

        const commentVisibility =
          decision === WORKFLOW_DECISIONS.END_WORK
            ? COMMENT_VISIBILITY.PRIVATE
            : COMMENT_VISIBILITY.PUBLIC;

        await prisma.lead.update({ where: { id: leadId }, data: { status: nextStatus } });
        await addWorkflowComment({
          leadId,
          action: "APPROVER_REJECT",
          decision,
          comment: comment.trim(),
          visibility: commentVisibility,
          user,
        });
        await writeAuditLog({
          user,
          action: "APPROVER_REJECT",
          entityType: "LEAD",
          entityId: leadId,
          metadata: { decision, nextStatus },
        });
        break;
      }

      case "update_fields": {
        if (!canEditLeadFields(user.role)) return forbidden();
        const { fullName, contactInfo, businessName, service, details } = body;
        await prisma.lead.update({
          where: { id: leadId },
          data: {
            ...(fullName !== undefined ? { fullName } : {}),
            ...(contactInfo !== undefined ? { contactInfo } : {}),
            ...(businessName !== undefined ? { businessName } : {}),
            ...(service !== undefined ? { service } : {}),
            ...(details !== undefined ? { details } : {}),
          },
        });
        await writeAuditLog({
          user,
          action: "UPDATE_LEAD_FIELDS",
          entityType: "LEAD",
          entityId: leadId,
        });
        break;
      }

      default:
        return NextResponse.json({ message: "action ไม่ถูกต้อง" }, { status: 400 });
    }

    const updatedLead = await getLeadForRole(leadId, user.role);
    if (!updatedLead) {
      return NextResponse.json({ message: "ไม่พบข้อมูลลีด" }, { status: 404 });
    }

    return NextResponse.json({ message: "ดำเนินการสำเร็จ", lead: updatedLead });
  } catch (error) {
    console.error("PATCH lead error:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!canDeleteLead(user.role)) return forbidden();

    const body = await request.json();
    const { leadId } = body;
    if (!leadId) {
      return NextResponse.json(
        { message: "ข้อมูลไม่ครบถ้วน (leadId)" },
        { status: 400 }
      );
    }

    await prisma.lead.delete({ where: { id: leadId } });
    await writeAuditLog({
      user,
      action: "DELETE_LEAD",
      entityType: "LEAD",
      entityId: leadId,
    });

    return NextResponse.json({ message: "ลบข้อมูลสำเร็จ" });
  } catch (error) {
    console.error("DELETE lead error:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการลบข้อมูล" },
      { status: 500 }
    );
  }
}
