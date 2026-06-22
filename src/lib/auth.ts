import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { Role } from "./roles";
import { isRole } from "./roles";
import type { SessionUser } from "./permissions";

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "adwaresource-secret-key-purple-cyan-1512"
);

export type SessionPayload = {
  userId: string;
  email: string;
  name: string;
  role: Role;
  loginIp: string;
};

export async function signSession(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(SECRET);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    const userId = payload.userId;
    const email = payload.email;
    const name = payload.name;
    const role = payload.role;
    const loginIp = payload.loginIp;

    if (
      typeof userId !== "string" ||
      typeof email !== "string" ||
      typeof name !== "string" ||
      typeof role !== "string" ||
      !isRole(role) ||
      typeof loginIp !== "string"
    ) {
      return null;
    }

    return { userId, email, name, role, loginIp };
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return null;
  return verifySession(token);
}
