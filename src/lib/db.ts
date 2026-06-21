import { promises as fs } from "fs";
import path from "path";
import { ContactInquiry, QuoteRequest, MarbleProduct } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readJson<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function getInquiries(): Promise<ContactInquiry[]> {
  return readJson<ContactInquiry[]>("inquiries.json", []);
}

export async function saveInquiry(inquiry: ContactInquiry): Promise<void> {
  const inquiries = await getInquiries();
  inquiries.unshift(inquiry);
  await writeJson("inquiries.json", inquiries);
}

export async function updateInquiryStatus(
  id: string,
  status: ContactInquiry["status"]
): Promise<boolean> {
  const inquiries = await getInquiries();
  const index = inquiries.findIndex((i) => i.id === id);
  if (index === -1) return false;
  inquiries[index].status = status;
  await writeJson("inquiries.json", inquiries);
  return true;
}

export async function getQuotes(): Promise<QuoteRequest[]> {
  return readJson<QuoteRequest[]>("quotes.json", []);
}

export async function saveQuote(quote: QuoteRequest): Promise<void> {
  const quotes = await getQuotes();
  quotes.unshift(quote);
  await writeJson("quotes.json", quotes);
}

export async function getAdminProducts(): Promise<MarbleProduct[]> {
  return readJson<MarbleProduct[]>("products.json", []);
}

export async function saveAdminProducts(products: MarbleProduct[]): Promise<void> {
  await writeJson("products.json", products);
}

export async function getAnalytics() {
  const inquiries = await getInquiries();
  const quotes = await getQuotes();
  const products = await getAdminProducts();

  return {
    totalInquiries: inquiries.length,
    newInquiries: inquiries.filter((i) => i.status === "new").length,
    totalQuotes: quotes.length,
    newQuotes: quotes.filter((q) => q.status === "new").length,
    totalProducts: products.length,
    recentInquiries: inquiries.slice(0, 5),
    recentQuotes: quotes.slice(0, 5),
  };
}
