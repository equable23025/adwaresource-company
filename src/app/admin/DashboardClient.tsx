'use client';

import React, { useState } from 'react';
import AuditLogPanel from './components/AuditLogPanel';
import LeadsPanel from './components/LeadsPanel';
import UsersPanel from './components/UsersPanel';
import type { Lead, SessionUser } from './types';

type Tab = 'leads' | 'audit' | 'users';

interface DashboardClientProps {
  user: SessionUser;
  initialLeads: Lead[];
}

export default function DashboardClient({ user, initialLeads }: DashboardClientProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activeTab, setActiveTab] = useState<Tab>('leads');
  const canViewAudit = user.role === 'APPROVER' || user.role === 'SUPER_ADMIN';

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', { method: 'POST' });
      if (response.ok) {
        window.location.href = '/admin/login';
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <>
      <div className="admin-header">
        <div className="wrap">
          <div className="admin-nav">
            <div className="admin-title">
              <h1>Adwaresource</h1>
              <span className="admin-badge">CRM Admin</span>
            </div>
            <div className="admin-user-meta">
              <div className="admin-user-info">
                <span><i className="fa-solid fa-user icon-mr" aria-hidden="true" />{user.name}</span>
                <span className="role-pill">{user.roleLabel}</span>
                <span className="admin-ip">
                  <i className="fa-solid fa-network-wired icon-mr" aria-hidden="true" />
                  IP: {user.loginIp}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <a href="/" className="action-btn" style={{ fontSize: '13px' }}>
                  <i className="fa-solid fa-house icon-mr" aria-hidden="true" />หน้าเว็บหลัก
                </a>
                <button onClick={handleLogout} className="action-btn delete" style={{ fontSize: '13px' }}>
                  <i className="fa-solid fa-right-from-bracket icon-mr" aria-hidden="true" />ออกจากระบบ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="wrap">
          <div className="admin-tabs">
            <button
              type="button"
              className={`admin-tab ${activeTab === 'leads' ? 'active' : ''}`}
              onClick={() => setActiveTab('leads')}
            >
              <i className="fa-solid fa-address-book icon-mr" aria-hidden="true" />ลีด / CRM
            </button>
            {canViewAudit && (
              <button
                type="button"
                className={`admin-tab ${activeTab === 'audit' ? 'active' : ''}`}
                onClick={() => setActiveTab('audit')}
              >
                <i className="fa-solid fa-clock-rotate-left icon-mr" aria-hidden="true" />Audit Log
              </button>
            )}
            {user.role === 'SUPER_ADMIN' && (
              <button
                type="button"
                className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                <i className="fa-solid fa-users-gear icon-mr" aria-hidden="true" />ผู้ใช้งาน
              </button>
            )}
          </div>

          {activeTab === 'leads' && (
            <LeadsPanel user={user} leads={leads} onLeadsChange={setLeads} />
          )}
          {activeTab === 'audit' && canViewAudit && <AuditLogPanel />}
          {activeTab === 'users' && user.role === 'SUPER_ADMIN' && <UsersPanel />}
        </div>
      </div>
    </>
  );
}
