import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "ออกจากระบบสำเร็จ" });
  
  // Set expired cookie to delete it
  response.cookies.set({
    name: "admin_session",
    value: "",
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });

  return response;
}
