import { NextRequest, NextResponse } from "next/server";
import { getAnalytics } from "@/lib/db";

function verifyAuth(request: NextRequest): boolean {
  const auth = request.headers.get("Authorization");
  const password = process.env.ADMIN_PASSWORD || "admin123";
  return auth === `Bearer ${password}`;
}

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const analytics = await getAnalytics();
  return NextResponse.json(analytics);
}
