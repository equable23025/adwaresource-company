import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "../../../lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  // Check if session cookie is already valid
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (token) {
    const session = await verifySession(token);
    if (session?.admin) {
      redirect("/admin");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "var(--bg)",
        fontFamily: "var(--font-kanit), sans-serif",
      }}
    >
      <div className="login-card">
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2 style={{ color: "var(--purple)", marginBottom: "8px" }}>Adwaresource</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>ระบบจัดการข้อมูลลูกค้า (หลังบ้าน)</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
