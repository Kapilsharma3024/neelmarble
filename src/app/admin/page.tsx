import { createMetadata } from "@/lib/seo";
import AdminPanel from "@/components/admin/AdminPanel";

export const metadata = createMetadata("Admin Panel", "LuxMarble administration dashboard");

export default function AdminPage() {
  return <AdminPanel />;
}
