import { NextResponse } from "next/server";
import { getSessionUser } from "../../../../lib/auth";
import { ROLE_LABELS } from "../../../../lib/roles";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      ...user,
      roleLabel: ROLE_LABELS[user.role],
    },
  });
}
