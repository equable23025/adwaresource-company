'use client';

import React, { useMemo, useState } from 'react';
import ActionDialog from './ActionDialog';
import type { Lead, Role, SessionUser, WorkflowComment } from '../types';

const STATUS_LABELS: Record<string, string> = {
  NEW: 'รอดำเนินการ',
  CONTACTED: 'ติดต่อแล้ว',
  PENDING_REVIEW: 'รอตรวจสอบ',
  PENDING_APPROVAL: 'รออนุมัติ',
  RETURNED_TO_MAKER: 'ตีกลับแก้ไข',
  ENDED: 'จบงาน',
  CLOSED: 'ปิดงานสำเร็จ',
};

const ACTION_LABELS: Record<string, string> = {
  MAKER_SUBMIT: 'ส่งปิดงาน',
  CHECKER_PASS: 'ตรวจสอบผ่าน',
  CHECKER_REJECT: 'Checker ไม่ผ่าน',
  APPROVER_APPROVE: 'อนุมัติปิดงาน',
  APPROVER_REJECT: 'ไม่อนุมัติ',
};

const DECISION_LABELS: Record<string, string> = {
  END_WORK: 'จบงาน',
  REVISE: 'แก้งาน',
  PASS: 'ผ่าน',
  APPROVE: 'อนุมัติ',
};

type DialogMode =
  | 'maker_submit'
  | 'checker_pass'
  | 'checker_reject'
  | 'approver_reject'
  | 'maker_note'
  | 'checker_note'
  | 'checker_summary'
  | 'edit_fields'
  | null;

type LeadsPanelProps = {
  user: SessionUser;
  leads: Lead[];
  onLeadsChange: (leads: Lead[]) => void;
};

const MAKER_SUBMIT_STATUSES = ['NEW', 'CONTACTED', 'RETURNED_TO_MAKER'];
const TERMINAL_STATUSES = ['CLOSED', 'ENDED'];

function canDelete(role: Role) {
  return role === 'APPROVER' || role === 'SUPER_ADMIN';
}

function canEditFields(role: Role) {
  return role === 'APPROVER' || role === 'SUPER_ADMIN';
}

function canCheckerReview(role: Role) {
  return role === 'CHECKER' || role === 'APPROVER' || role === 'SUPER_ADMIN';
}

function canApproverDecide(role: Role) {
  return role === 'APPROVER' || role === 'SUPER_ADMIN';
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function statusToCss(status: string) {
  return status.toLowerCase().replace(/_/g, '-');
}

export default function LeadsPanel({ user, leads, onLeadsChange }: LeadsPanelProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [makerNote, setMakerNote] = useState('');
  const [checkerNote, setCheckerNote] = useState('');
  const [checkerSummary, setCheckerSummary] = useState('');
  const [workflowComment, setWorkflowComment] = useState('');
  const [workflowDecision, setWorkflowDecision] = useState<'END_WORK' | 'REVISE'>('REVISE');
  const [editFields, setEditFields] = useState({
    fullName: '',
    contactInfo: '',
    businessName: '',
    service: '',
    details: '',
  });

  const patchLead = async (leadId: string, body: Record<string, unknown>) => {
    setActionLoadingId(leadId);
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, ...body }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || 'ไม่สามารถดำเนินการได้');
        return null;
      }
      return data.lead as Lead;
    } catch {
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
      return null;
    } finally {
      setActionLoadingId(null);
    }
  };

  const updateLeadInState = (updated: Lead) => {
    onLeadsChange(leads.map((lead) => (lead.id === updated.id ? updated : lead)));
  };

  const openDialog = (mode: DialogMode, lead: Lead) => {
    setActiveLead(lead);
    setDialogMode(mode);
    setMakerNote(lead.makerNote || '');
    setCheckerNote(lead.checkerNote || '');
    setCheckerSummary(lead.checkerSummary || '');
    setWorkflowComment('');
    setWorkflowDecision('REVISE');
    setEditFields({
      fullName: lead.fullName,
      contactInfo: lead.contactInfo,
      businessName: lead.businessName || '',
      service: lead.service,
      details: lead.details || '',
    });
  };

  const closeDialog = () => {
    setDialogMode(null);
    setActiveLead(null);
  };

  const handleMarkContacted = async (leadId: string) => {
    const updated = await patchLead(leadId, { action: 'mark_contacted' });
    if (updated) updateLeadInState(updated);
  };

  const handleDelete = async (leadId: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบรายการนี้?')) return;
    setActionLoadingId(leadId);
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId }),
      });
      if (response.ok) {
        onLeadsChange(leads.filter((lead) => lead.id !== leadId));
        if (expandedLeadId === leadId) setExpandedLeadId(null);
      } else {
        const data = await response.json();
        alert(data.message || 'ไม่สามารถลบได้');
      }
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDialogSubmit = async () => {
    if (!activeLead) return;
    let updated: Lead | null = null;

    switch (dialogMode) {
      case 'maker_submit':
        updated = await patchLead(activeLead.id, { action: 'maker_submit', makerNote });
        break;
      case 'checker_pass':
        updated = await patchLead(activeLead.id, {
          action: 'checker_pass',
          checkerNote,
          checkerSummary,
        });
        break;
      case 'checker_reject':
        if (!workflowComment.trim()) {
          alert('กรุณากรอกความคิดเห็น');
          return;
        }
        updated = await patchLead(activeLead.id, {
          action: 'checker_reject',
          decision: workflowDecision,
          comment: workflowComment,
        });
        break;
      case 'approver_reject':
        if (!workflowComment.trim()) {
          alert('กรุณากรอกความคิดเห็น');
          return;
        }
        updated = await patchLead(activeLead.id, {
          action: 'approver_reject',
          decision: workflowDecision,
          comment: workflowComment,
        });
        break;
      case 'maker_note':
        updated = await patchLead(activeLead.id, { action: 'add_maker_note', note: makerNote });
        break;
      case 'checker_note':
        updated = await patchLead(activeLead.id, { action: 'add_checker_note', note: checkerNote });
        break;
      case 'checker_summary':
        updated = await patchLead(activeLead.id, { action: 'add_checker_summary', summary: checkerSummary });
        break;
      case 'edit_fields':
        updated = await patchLead(activeLead.id, {
          action: 'update_fields',
          ...editFields,
          businessName: editFields.businessName || null,
        });
        break;
      default:
        return;
    }

    if (updated) {
      updateLeadInState(updated);
      closeDialog();
    }
  };

  const metrics = useMemo(
    () => ({
      total: leads.length,
      review: leads.filter((l) => l.status === 'PENDING_REVIEW').length,
      approval: leads.filter((l) => l.status === 'PENDING_APPROVAL').length,
      returned: leads.filter((l) => l.status === 'RETURNED_TO_MAKER').length,
      closed: leads.filter((l) => l.status === 'CLOSED').length,
      ended: leads.filter((l) => l.status === 'ENDED').length,
    }),
    [leads]
  );

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    const q = search.toLowerCase();
    return (
      matchesStatus &&
      (lead.fullName.toLowerCase().includes(q) ||
        lead.contactInfo.toLowerCase().includes(q) ||
        (lead.businessName && lead.businessName.toLowerCase().includes(q)) ||
        lead.service.toLowerCase().includes(q))
    );
  });

  const dialogTitle =
    dialogMode === 'maker_submit'
      ? 'ส่งปิดงาน → รอตรวจสอบ'
      : dialogMode === 'checker_pass'
        ? 'ตรวจสอบผ่าน → รออนุมัติ'
        : dialogMode === 'checker_reject'
          ? 'ตรวจสอบไม่ผ่าน'
          : dialogMode === 'approver_reject'
            ? 'ไม่อนุมัติ'
            : dialogMode === 'maker_note'
              ? 'รายละเอียดปิดงาน (Maker)'
              : dialogMode === 'checker_note'
                ? 'รายละเอียด (Checker)'
                : dialogMode === 'checker_summary'
                  ? 'สรุปรายงาน (Checker)'
                  : dialogMode === 'edit_fields'
                    ? 'แก้ไขข้อมูลลีด'
                    : '';

  const dialogSubmitLabel =
    dialogMode === 'maker_submit'
      ? 'ส่งปิดงาน'
      : dialogMode === 'checker_pass'
        ? 'ยืนยันผ่าน'
        : dialogMode === 'checker_reject' || dialogMode === 'approver_reject'
          ? 'ยืนยัน'
          : 'บันทึก';

  const renderWorkflowTimeline = (comments: WorkflowComment[]) => {
    if (!comments.length) {
      return <p className="lead-meta">ยังไม่มีประวัติ workflow</p>;
    }

    return (
      <div className="workflow-timeline">
        {comments.map((item) => {
          const isRejectAction =
            item.action === 'APPROVER_REJECT' || item.action === 'CHECKER_REJECT';
          const isPassAction =
            item.action === 'CHECKER_PASS' || item.action === 'APPROVER_APPROVE';
          const isSubmitAction = item.action === 'MAKER_SUBMIT';
          const isReviseDecision = item.decision === 'REVISE';
          const isPassDecision =
            item.decision === 'PASS' || item.decision === 'APPROVE';

          return (
          <div
            key={item.id}
            className={`workflow-item ${item.visibility === 'PRIVATE' ? 'private' : ''} ${isReviseDecision ? 'revise' : ''} ${isPassAction ? 'pass' : ''} ${isSubmitAction ? 'submit' : ''}`}
          >
            <div className="workflow-item-head">
              <strong
                className={
                  isRejectAction
                    ? 'workflow-action-reject'
                    : isPassAction
                      ? 'workflow-action-pass'
                      : isSubmitAction
                        ? 'workflow-action-submit'
                        : ''
                }
              >
                {ACTION_LABELS[item.action] || item.action}
              </strong>
              {item.decision && (
                <span
                  className={`role-pill ${
                    item.decision === 'REVISE'
                      ? 'pill-revise'
                      : item.decision === 'END_WORK'
                        ? 'pill-end-work'
                        : isPassDecision
                          ? 'pill-pass'
                          : ''
                  }`}
                >
                  {DECISION_LABELS[item.decision] || item.decision}
                </span>
              )}
              {item.visibility === 'PRIVATE' && (
                <span className="role-pill pill-private">
                  เฉพาะ Approver
                </span>
              )}
              {item.visibility === 'PUBLIC' && item.action === 'APPROVER_REJECT' && isReviseDecision && (
                <span className="role-pill pill-revise-tag">
                  คำสั่งแก้ไข — เห็นทุกคน
                </span>
              )}
            </div>
            <p>{item.comment}</p>
            <div className="lead-meta">
              {item.createdBy} ({item.createdByRole}) · {formatDate(item.createdAt)}
            </div>
          </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">ทั้งหมด</div>
          <div className="stat-value">{metrics.total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">รอตรวจสอบ</div>
          <div className="stat-value" style={{ color: '#1565c0' }}>{metrics.review}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">รออนุมัติ</div>
          <div className="stat-value" style={{ color: '#7b1fa2' }}>{metrics.approval}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">ตีกลับแก้ไข</div>
          <div className="stat-value warning">{metrics.returned}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">ปิดงานสำเร็จ</div>
          <div className="stat-value success">{metrics.closed}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">จบงาน</div>
          <div className="stat-value" style={{ color: '#6b7280' }}>{metrics.ended}</div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header" style={{ flexWrap: 'wrap', gap: '15px' }}>
          <h2>CRM — Workflow ปิดงาน</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="ค้นหา..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-input"
              style={{ minWidth: '200px' }}
            />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="admin-input">
              <option value="ALL">ทุกสถานะ</option>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}></th>
                <th>ชื่อ</th>
                <th>ติดต่อ</th>
                <th>บริการ</th>
                <th>วันที่</th>
                <th>สถานะ</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
                    ไม่มีข้อมูล
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const isExpanded = expandedLeadId === lead.id;
                  const loading = actionLoadingId === lead.id;
                  const isTerminal = TERMINAL_STATUSES.includes(lead.status);

                  return (
                    <React.Fragment key={lead.id}>
                      <tr onClick={() => setExpandedLeadId(isExpanded ? null : lead.id)} style={{ cursor: 'pointer' }}>
                        <td style={{ textAlign: 'center', color: 'var(--muted)' }}>
                          <i className={`fa-solid ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'}`} aria-hidden="true" />
                        </td>
                        <td style={{ fontWeight: 500 }}>{lead.fullName}</td>
                        <td>{lead.contactInfo}</td>
                        <td>{lead.service}</td>
                        <td>{formatDate(lead.createdAt)}</td>
                        <td>
                          <span className={`status-pill ${statusToCss(lead.status)}`}>
                            {STATUS_LABELS[lead.status] || lead.status}
                          </span>
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <div className="admin-actions">
                            {!isTerminal && (lead.status === 'NEW' || lead.status === 'RETURNED_TO_MAKER') && (
                              <button onClick={() => handleMarkContacted(lead.id)} className="action-btn" disabled={loading}>
                                <i className="fa-solid fa-phone icon-mr" aria-hidden="true" />ติดต่อ
                              </button>
                            )}

                            {user.role === 'MAKER' && MAKER_SUBMIT_STATUSES.includes(lead.status) && (
                              <button onClick={() => openDialog('maker_submit', lead)} className="action-btn submit" disabled={loading}>
                                <i className="fa-solid fa-paper-plane icon-mr" aria-hidden="true" />ส่งปิดงาน
                              </button>
                            )}

                            {lead.status === 'PENDING_REVIEW' && canCheckerReview(user.role) && user.role === 'CHECKER' && (
                              <>
                                <button onClick={() => openDialog('checker_pass', lead)} className="action-btn pass" disabled={loading}>
                                  <i className="fa-solid fa-check icon-mr" aria-hidden="true" />ผ่าน
                                </button>
                                <button onClick={() => openDialog('checker_reject', lead)} className="action-btn delete" disabled={loading}>
                                  <i className="fa-solid fa-xmark icon-mr" aria-hidden="true" />ไม่ผ่าน
                                </button>
                              </>
                            )}

                            {lead.status === 'PENDING_APPROVAL' && canApproverDecide(user.role) && (
                              <>
                                <button
                                  onClick={async () => {
                                    const updated = await patchLead(lead.id, { action: 'approver_approve' });
                                    if (updated) updateLeadInState(updated);
                                  }}
                                  className="action-btn primary"
                                  disabled={loading}
                                >
                                  <i className="fa-solid fa-stamp icon-mr" aria-hidden="true" />อนุมัติ
                                </button>
                                <button onClick={() => openDialog('approver_reject', lead)} className="action-btn delete" disabled={loading}>
                                  <i className="fa-solid fa-ban icon-mr" aria-hidden="true" />ไม่อนุมัติ
                                </button>
                              </>
                            )}

                            {canEditFields(user.role) && (
                              <button onClick={() => openDialog('edit_fields', lead)} className="action-btn" disabled={loading}>
                                <i className="fa-solid fa-pen icon-mr" aria-hidden="true" />แก้ไข
                              </button>
                            )}

                            {canDelete(user.role) && (
                              <button onClick={() => handleDelete(lead.id)} className="action-btn delete" disabled={loading}>
                                <i className="fa-solid fa-trash icon-mr" aria-hidden="true" />ลบ
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr style={{ background: '#fbfbfd' }}>
                          <td></td>
                          <td colSpan={6} style={{ padding: '16px 20px' }}>
                            <div className="lead-detail-grid">
                              <div className="lead-detail-block">
                                <strong>รายละเอียดจากผู้ติดต่อ</strong>
                                <p>{lead.details || '-'}</p>
                                <div className="lead-meta">กิจการ: {lead.businessName || '-'}</div>
                              </div>

                              <div className="lead-detail-block">
                                <div className="lead-detail-head">
                                  <strong>รายละเอียด Maker</strong>
                                  {user.role === 'MAKER' && !isTerminal && (
                                    <button className="action-btn" style={{ fontSize: '12px', padding: '3px 8px' }} onClick={() => openDialog('maker_note', lead)}>
                                      แก้ไข
                                    </button>
                                  )}
                                </div>
                                <p>{lead.makerNote || '-'}</p>
                                <div className="lead-meta">{lead.makerNoteBy || '-'} · {formatDate(lead.makerNoteAt)}</div>
                              </div>

                              {user.role !== 'MAKER' && (
                                <>
                                  <div className="lead-detail-block">
                                    <div className="lead-detail-head">
                                      <strong>รายละเอียด Checker</strong>
                                      {user.role === 'CHECKER' && (
                                        <button className="action-btn" style={{ fontSize: '12px', padding: '3px 8px' }} onClick={() => openDialog('checker_note', lead)}>แก้ไข</button>
                                      )}
                                    </div>
                                    <p>{lead.checkerNote || '-'}</p>
                                  </div>
                                  <div className="lead-detail-block">
                                    <div className="lead-detail-head">
                                      <strong>สรุป Checker</strong>
                                      {user.role === 'CHECKER' && (
                                        <button className="action-btn" style={{ fontSize: '12px', padding: '3px 8px' }} onClick={() => openDialog('checker_summary', lead)}>แก้ไข</button>
                                      )}
                                    </div>
                                    <p>{lead.checkerSummary || '-'}</p>
                                  </div>
                                </>
                              )}

                              <div className="lead-detail-block" style={{ gridColumn: '1 / -1' }}>
                                <strong>ประวัติ Workflow & ความคิดเห็น</strong>
                                {renderWorkflowTimeline(lead.workflowComments || [])}
                              </div>

                              {lead.status === 'CLOSED' && (
                                <div className="lead-detail-block">
                                  <strong>ปิดงานสำเร็จ</strong>
                                  <p>โดย {lead.closedBy} · {formatDate(lead.closedAt)}</p>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ActionDialog
        open={!!dialogMode}
        title={dialogTitle}
        onClose={closeDialog}
        onSubmit={handleDialogSubmit}
        submitLabel={dialogSubmitLabel}
        loading={!!actionLoadingId}
      >
        {dialogMode === 'maker_submit' && (
          <label className="admin-field">
            <span>รายละเอียดปิดงาน (บังคับ)</span>
            <textarea value={makerNote} onChange={(e) => setMakerNote(e.target.value)} rows={5} className="admin-input" placeholder="บันทึกรายละเอียดก่อนส่งให้ Checker ตรวจสอบ" />
          </label>
        )}

        {dialogMode === 'checker_pass' && (
          <>
            <label className="admin-field">
              <span>รายละเอียด Checker</span>
              <textarea value={checkerNote} onChange={(e) => setCheckerNote(e.target.value)} rows={3} className="admin-input" />
            </label>
            <label className="admin-field">
              <span>สรุปรายงาน</span>
              <textarea value={checkerSummary} onChange={(e) => setCheckerSummary(e.target.value)} rows={3} className="admin-input" />
            </label>
          </>
        )}

        {(dialogMode === 'checker_reject' || dialogMode === 'approver_reject') && (
          <>
            <div className="admin-field">
              <span>เลือกผลการดำเนินการ</span>
              <div className="workflow-decision-options">
                <label className="workflow-decision-option">
                  <input type="radio" name="decision" checked={workflowDecision === 'END_WORK'} onChange={() => setWorkflowDecision('END_WORK')} />
                  จบงาน
                </label>
                <label className="workflow-decision-option">
                  <input type="radio" name="decision" checked={workflowDecision === 'REVISE'} onChange={() => setWorkflowDecision('REVISE')} />
                  แก้งาน (ตีกลับ Maker)
                </label>
              </div>
            </div>
            <label className="admin-field">
              <span>
                ความคิดเห็น (บังคับ)
                {dialogMode === 'approver_reject'
                  ? workflowDecision === 'REVISE'
                    ? ' — เห็นทุกคน (Maker / Checker จะเห็นคำสั่งแก้ไข)'
                    : ' — เห็นเฉพาะ Approver / Super Admin'
                  : ' — เห็นทุกคน'}
              </span>
              <textarea value={workflowComment} onChange={(e) => setWorkflowComment(e.target.value)} rows={4} className="admin-input" />
            </label>
          </>
        )}

        {dialogMode === 'maker_note' && (
          <label className="admin-field">
            <span>รายละเอียด Maker</span>
            <textarea value={makerNote} onChange={(e) => setMakerNote(e.target.value)} rows={5} className="admin-input" />
          </label>
        )}

        {dialogMode === 'checker_note' && (
          <label className="admin-field">
            <span>รายละเอียด Checker</span>
            <textarea value={checkerNote} onChange={(e) => setCheckerNote(e.target.value)} rows={5} className="admin-input" />
          </label>
        )}

        {dialogMode === 'checker_summary' && (
          <label className="admin-field">
            <span>สรุปรายงาน</span>
            <textarea value={checkerSummary} onChange={(e) => setCheckerSummary(e.target.value)} rows={5} className="admin-input" />
          </label>
        )}

        {dialogMode === 'edit_fields' && (
          <>
            <label className="admin-field"><span>ชื่อ</span><input className="admin-input" value={editFields.fullName} onChange={(e) => setEditFields({ ...editFields, fullName: e.target.value })} /></label>
            <label className="admin-field"><span>ติดต่อ</span><input className="admin-input" value={editFields.contactInfo} onChange={(e) => setEditFields({ ...editFields, contactInfo: e.target.value })} /></label>
            <label className="admin-field"><span>กิจการ</span><input className="admin-input" value={editFields.businessName} onChange={(e) => setEditFields({ ...editFields, businessName: e.target.value })} /></label>
            <label className="admin-field"><span>บริการ</span><input className="admin-input" value={editFields.service} onChange={(e) => setEditFields({ ...editFields, service: e.target.value })} /></label>
            <label className="admin-field"><span>รายละเอียด</span><textarea className="admin-input" rows={4} value={editFields.details} onChange={(e) => setEditFields({ ...editFields, details: e.target.value })} /></label>
          </>
        )}
      </ActionDialog>
    </>
  );
}
