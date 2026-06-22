import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "../../lib/auth";
import { getLeadsForRole } from "../../lib/leads";
import { ROLE_LABELS } from "../../lib/roles";
import type { Role } from "../../lib/roles";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) {
    redirect("/admin/login");
  }

  const session = await verifySession(token);
  if (!session) {
    redirect("/admin/login");
  }

  const initialLeads = await getLeadsForRole(session.role);

  const user = {
    userId: session.userId,
    email: session.email,
    name: session.name,
    role: session.role,
    roleLabel: ROLE_LABELS[session.role as Role],
    loginIp: session.loginIp,
  };

  return (
    <div className="admin-container">
      <DashboardClient user={user} initialLeads={initialLeads} />
    </div>
  );
}
