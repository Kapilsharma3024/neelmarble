"use client";

import { marbleSections } from "@/data/collections";
import MarbleHoverCard from "@/components/marble/MarbleHoverCard";
import Link from "next/link";

export default function FeaturedProducts() {
  const featured = marbleSections.slice(0, 4);

  return (
    <section className="relative z-20 bg-luxury-charcoal section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.5em] text-luxury-gold">Featured</p>
            <h2 className="heading-section text-luxury-cream">Indian Marbles</h2>
          </div>
          <Link href="/collections" className="btn-secondary text-xs">View All</Link>
        </div>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {featured.map((section) => (
            <MarbleHoverCard key={section.id} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}
