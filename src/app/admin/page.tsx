import { createMetadata } from "@/lib/seo";
import AdminPanel from "@/components/admin/AdminPanel";

export const metadata = createMetadata("Admin Panel", "NeelMarble administration dashboard");

export default function AdminPage() {
  return <AdminPanel />;
}
