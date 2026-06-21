import { NextRequest, NextResponse } from "next/server";
import { getAdminProducts, saveAdminProducts } from "@/lib/db";
import { products as defaultProducts } from "@/data/products";
import { MarbleProduct } from "@/types";

function verifyAuth(request: NextRequest): boolean {
  const auth = request.headers.get("Authorization");
  const password = process.env.ADMIN_PASSWORD || "admin123";
  return auth === `Bearer ${password}`;
}

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let products = await getAdminProducts();
  if (products.length === 0) {
    products = defaultProducts;
    await saveAdminProducts(products);
  }

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const product: MarbleProduct = await request.json();
  const products = await getAdminProducts();
  products.push(product);
  await saveAdminProducts(products);

  return NextResponse.json(product, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const products = await getAdminProducts();
  const filtered = products.filter((p) => p.id !== id);
  await saveAdminProducts(filtered);

  return NextResponse.json({ success: true });
}
