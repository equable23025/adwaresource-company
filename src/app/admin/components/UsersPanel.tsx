'use client';

import React, { useEffect, useState } from 'react';
import type { AdminUser, Role } from '../types';

const ROLES: Role[] = ['MAKER', 'CHECKER', 'APPROVER', 'SUPER_ADMIN'];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function UsersPanel() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
    role: 'MAKER' as Role,
  });
  const [saving, setSaving] = useState(false);

  const fetchUsers = async () => {
    const response = await fetch('/api/admin/users');
    if (response.ok) {
      const data = await response.json();
      setUsers(data.users);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setUsers((prev) => [data.user, ...prev]);
        setForm({ email: '', name: '', password: '', role: 'MAKER' });
      } else {
        alert(data.message || 'ไม่สามารถสร้างผู้ใช้ได้');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (userId: string, patch: Partial<AdminUser> & { password?: string }) => {
    const response = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, ...patch }),
    });
    const data = await response.json();
    if (response.ok) {
      setUsers((prev) => prev.map((u) => (u.id === userId ? data.user : u)));
    } else {
      alert(data.message || 'ไม่สามารถอัปเดตได้');
    }
  };

  return (
    <div className="admin-users-layout">
      <div className="table-card">
        <div className="table-header">
          <h2>จัดการผู้ใช้ (CRM)</h2>
        </div>
        <form onSubmit={handleCreate} className="user-create-form">
          <input className="admin-input" placeholder="อีเมล" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="admin-input" placeholder="ชื่อ" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="admin-input" placeholder="รหัสผ่าน" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <select className="admin-input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}>
            {ROLES.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <button type="submit" className="action-btn primary" disabled={saving}>
            {saving ? 'กำลังสร้าง...' : 'เพิ่มผู้ใช้'}
          </button>
        </form>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>อีเมล</th>
                <th>ชื่อ</th>
                <th>Role</th>
                <th>สถานะ</th>
                <th>สร้างเมื่อ</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '30px' }}>กำลังโหลด...</td></tr>
              ) : users.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>
                    <select
                      className="admin-input"
                      value={user.role}
                      onChange={(e) => handleUpdate(user.id, { role: e.target.value as Role })}
                      style={{ fontSize: '12px', padding: '4px 8px' }}
                    >
                      {ROLES.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`status-pill ${user.active ? 'closed' : 'new'}`}
                      onClick={() => handleUpdate(user.id, { active: !user.active })}
                      style={{ border: 'none', cursor: 'pointer' }}
                    >
                      {user.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>
                    <button
                      type="button"
                      className="action-btn"
                      style={{ fontSize: '12px', padding: '4px 8px' }}
                      onClick={() => {
                        const password = prompt('รหัสผ่านใหม่:');
                        if (password) handleUpdate(user.id, { password });
                      }}
                    >
                      รีเซ็ตรหัสผ่าน
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
