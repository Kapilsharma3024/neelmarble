import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { saveQuote } from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const product = formData.get("product") as string;
    const area = formData.get("area") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    if (!product || !area || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let designFile: string | undefined;
    const file = formData.get("designFile") as File | null;
    if (file && file.size > 0) {
      const uploadsDir = path.join(process.cwd(), "data", "uploads");
      await fs.mkdir(uploadsDir, { recursive: true });
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${uuidv4()}-${file.name}`;
      await fs.writeFile(path.join(uploadsDir, filename), buffer);
      designFile = filename;
    }

    const quote = {
      id: uuidv4(),
      product,
      quantity: (formData.get("quantity") as string) || "",
      area,
      budget: (formData.get("budget") as string) || "",
      timeline: (formData.get("timeline") as string) || "",
      email,
      phone,
      designFile,
      createdAt: new Date().toISOString(),
      status: "new" as const,
    };

    await saveQuote(quote);

    return NextResponse.json({ success: true, id: quote.id });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
