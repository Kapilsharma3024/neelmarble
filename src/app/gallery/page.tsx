import { createMetadata } from "@/lib/seo";
import GalleryMasonry from "@/components/gallery/GalleryMasonry";

export const metadata = createMetadata(
  "Project Gallery",
  "Explore our portfolio of luxury marble installations — residential, commercial, hospitality, and more.",
  "/gallery"
);

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-luxury-black pt-32">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.5em] text-luxury-gold">Portfolio</p>
          <h1 className="heading-display text-luxury-cream">
            Project <span className="gold-text">Gallery</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-luxury-cream/60">
            Discover how our premium marble transforms spaces across India and beyond.
          </p>
        </div>
        <GalleryMasonry />
      </div>
    </div>
  );
}
