'use client';

import React, { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginIp, setLoginIp] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.user?.loginIp) {
          setLoginIp(data.user.loginIp);
        }
        window.location.href = '/admin';
      } else {
        setError(data.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (err) {
      console.error('Login submit error:', err);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && (
        <div className="form-error" style={{ fontSize: '13.5px', padding: '10px', marginBottom: '16px' }}>
          {error}
        </div>
      )}
      <div className="field">
        <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 500 }}>
          อีเมล
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@adwaresource.co.th"
          className="admin-input"
          style={{ width: '100%', marginTop: '6px' }}
          required
        />
      </div>
      <div className="field" style={{ marginTop: '12px' }}>
        <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 500 }}>
          รหัสผ่าน
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="กรอกรหัสผ่านเพื่อเข้าใช้งาน"
          className="admin-input"
          style={{ width: '100%', marginTop: '6px' }}
          required
        />
      </div>
      {loginIp && (
        <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '10px' }}>
          IP ที่เข้าสู่ระบบ: {loginIp}
        </p>
      )}
      <button
        type="submit"
        className="btn btn-purple"
        style={{
          width: '100%',
          justifyContent: 'center',
          marginTop: '16px',
          fontSize: '14.5px',
          padding: '10px',
        }}
        disabled={loading}
      >
        {loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
      </button>
    </form>
  );
}
