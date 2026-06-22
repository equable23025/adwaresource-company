'use client';

import React from 'react';

type ActionDialogProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  submitLabel: string;
  loading?: boolean;
  children: React.ReactNode;
};

export default function ActionDialog({
  open,
  title,
  onClose,
  onSubmit,
  submitLabel,
  loading,
  children,
}: ActionDialogProps) {
  if (!open) return null;

  return (
    <div className="admin-dialog-overlay" onClick={onClose}>
      <div className="admin-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="admin-dialog-header">
          <h3>{title}</h3>
          <button type="button" className="admin-dialog-close" onClick={onClose} aria-label="ปิด">
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>
        <div className="admin-dialog-body">{children}</div>
        <div className="admin-dialog-footer">
          <button type="button" className="action-btn" onClick={onClose} disabled={loading}>
            ยกเลิก
          </button>
          <button type="button" className="action-btn primary" onClick={onSubmit} disabled={loading}>
            {loading ? 'กำลังบันทึก...' : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
