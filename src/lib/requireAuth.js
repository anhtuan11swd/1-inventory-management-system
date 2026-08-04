import { NextResponse } from "next/server";
import { auth } from "@/lib/authOptions";

export async function requireAuth() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Chưa xác thực" }, { status: 401 });
  }

  return null;
}
