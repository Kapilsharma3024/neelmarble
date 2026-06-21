"use client";

import { marbleSections } from "@/data/collections";
import MarbleHoverCard from "@/components/marble/MarbleHoverCard";
import Link from "next/link";

export default function MarbleCollectionGrid() {
  return (
    <section className="section-padding bg-luxury-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-[10px] uppercase tracking-[0.5em] text-luxury-gold">
            {marbleSections.length} Indian Marbles
          </p>
          <h2 className="heading-section text-luxury-cream">
            Hover to Preview <span className="gold-text">Installed</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-xs text-luxury-cream/50 sm:mt-4 sm:text-sm">
            Raw slab by default · tap on mobile or hover on desktop
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 min-[480px]:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {marbleSections.map((section) => (
            <MarbleHoverCard key={section.id} section={section} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/collections" className="btn-primary text-xs">View Full Catalog</Link>
        </div>
      </div>
    </section>
  );
}
