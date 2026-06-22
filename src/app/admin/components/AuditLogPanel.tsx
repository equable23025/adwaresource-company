'use client';

import React, { useCallback, useEffect, useState } from 'react';
import TruncatedText from './TruncatedText';
import type { AuditLog } from '../types';

const PAGE_SIZE = 20;

const ACTION_LABELS: Record<string, string> = {
  LOGIN: 'เข้าสู่ระบบ',
  VIEW_LEADS: 'ดูรายการลีด',
  VIEW_AUDIT_LOGS: 'ดู Audit Log',
  UPDATE_STATUS: 'อัปเดตสถานะ',
  ADD_MAKER_NOTE: 'เพิ่มรายละเอียด',
  UPDATE_MAKER_NOTE: 'แก้ไขรายละเอียด',
  ADD_CHECKER_NOTE: 'เพิ่มรายละเอียด',
  UPDATE_CHECKER_NOTE: 'แก้ไขรายละเอียด',
  ADD_CHECKER_SUMMARY: 'เพิ่มข้อสรุป',
  UPDATE_CHECKER_SUMMARY: 'แก้ไขข้อสรุป',
  CLOSE_LEAD: 'ปิดงาน',
  SEND_TO_APPROVER: 'ส่งอนุมัติ',
  APPROVE_CLOSE: 'อนุมัติปิดงาน',
  MAKER_SUBMIT: 'ส่งปิดงาน',
  MARK_CONTACTED: 'บันทึกติดต่อแล้ว',
  CHECKER_PASS: 'ตรวจสอบผ่าน',
  CHECKER_REJECT: 'ตรวจสอบไม่ผ่าน',
  APPROVER_APPROVE: 'อนุมัติปิดงาน',
  APPROVER_REJECT: 'ไม่อนุมัติ',
  UPDATE_LEAD_FIELDS: 'แก้ไขข้อมูลลีด',
  DELETE_LEAD: 'ลบลีด',
  CREATE_USER: 'สร้างผู้ใช้',
  UPDATE_USER: 'อัปเดตผู้ใช้',
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function formatEntity(log: AuditLog) {
  if (!log.entityType && !log.entityId) return '-';
  if (!log.entityId) return log.entityType || '-';
  return `${log.entityType} · ${log.entityId}`;
}

export default function AuditLogPanel() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1,
    hasPrev: false,
    hasNext: false,
  });

  const fetchLogs = useCallback(async (targetPage: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(targetPage),
        limit: String(PAGE_SIZE),
      });
      const response = await fetch(`/api/admin/audit-logs?${params}`);
      if (response.ok) {
        const data = await response.json();
        setLogs(data.logs);
        setPagination(data.pagination);
        setPage(data.pagination.page);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs(page);
  }, [page, fetchLogs]);

  const rangeStart = pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const rangeEnd = Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <div className="table-card">
      <div className="table-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
        <h2>Audit Log — บันทึกการทำงาน</h2>
        {!loading && pagination.total > 0 && (
          <span className="lead-meta">
            ทั้งหมด {pagination.total.toLocaleString('th-TH')} รายการ
          </span>
        )}
      </div>
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>เวลา</th>
              <th>ผู้ใช้</th>
              <th>Role</th>
              <th>Action</th>
              <th>Entity</th>
              <th>IP</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: 'var(--muted)' }}>
                  กำลังโหลด...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: 'var(--muted)' }}>
                  ยังไม่มี log
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <TruncatedText text={formatDate(log.createdAt)} maxWidth={160} />
                  </td>
                  <td>
                    <TruncatedText text={log.userEmail} maxWidth={200} />
                  </td>
                  <td><span className="role-pill">{log.userRole}</span></td>
                  <td>
                    <TruncatedText
                      text={ACTION_LABELS[log.action] || log.action}
                      maxWidth={160}
                    />
                  </td>
                  <td style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    <TruncatedText text={formatEntity(log)} maxWidth={200} />
                  </td>
                  <td>{log.ipAddress || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && pagination.total > 0 && (
        <div className="admin-pagination">
          <div className="admin-pagination-info">
            แสดง {rangeStart.toLocaleString('th-TH')}–{rangeEnd.toLocaleString('th-TH')} จาก {pagination.total.toLocaleString('th-TH')}
          </div>
          <div className="admin-pagination-controls">
            <button
              type="button"
              className="action-btn"
              disabled={!pagination.hasPrev || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <i className="fa-solid fa-chevron-left icon-mr" aria-hidden="true" />
              ก่อนหน้า
            </button>
            <span className="admin-pagination-page">
              หน้า {pagination.page} / {pagination.totalPages}
            </span>
            <button
              type="button"
              className="action-btn"
              disabled={!pagination.hasNext || loading}
              onClick={() => setPage((p) => p + 1)}
            >
              ถัดไป
              <i className="fa-solid fa-chevron-right icon-ml" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
