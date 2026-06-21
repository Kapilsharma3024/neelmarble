import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Collections",
  "Browse our premium Indian marble collections for flooring, wall cladding, countertops, and luxury interiors.",
  "/collections"
);

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
