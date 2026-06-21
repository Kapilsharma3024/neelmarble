import { NextRequest, NextResponse } from "next/server";
import { getInquiries, updateInquiryStatus } from "@/lib/db";

function verifyAuth(request: NextRequest): boolean {
  const auth = request.headers.get("Authorization");
  const password = process.env.ADMIN_PASSWORD || "admin123";
  return auth === `Bearer ${password}`;
}

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const inquiries = await getInquiries();
  return NextResponse.json(inquiries);
}

export async function PATCH(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await request.json();
  const success = await updateInquiryStatus(id, status);

  if (!success) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
