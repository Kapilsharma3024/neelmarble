"use client";

import { marbleSections } from "@/data/collections";
import { useShowroom } from "./ShowroomContext";

export default function BeforeAfterToggle() {
  const { showInstalled, setShowInstalled } = useShowroom();

  return (
    <div className="absolute right-6 top-28 z-30 lg:right-12 lg:top-32">
      <div className="flex overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl">
        <button
          onClick={() => setShowInstalled(false)}
          className={`px-4 py-2.5 text-[10px] uppercase tracking-[0.25em] ${
            !showInstalled
              ? "bg-luxury-gold text-luxury-black"
              : "text-luxury-cream/50 hover:text-luxury-cream"
          }`}
          style={{ transition: "none" }}
        >
          Raw Slab
        </button>
        <button
          onClick={() => setShowInstalled(true)}
          className={`px-4 py-2.5 text-[10px] uppercase tracking-[0.25em] ${
            showInstalled
              ? "bg-luxury-gold text-luxury-black"
              : "text-luxury-cream/50 hover:text-luxury-cream"
          }`}
          style={{ transition: "none" }}
        >
          Installed
        </button>
      </div>
    </div>
  );
}

function CollectionNav() {
  const { activeIndex, scrollToSection } = useShowroom();

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/5 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center overflow-x-auto px-2 py-3 scrollbar-hide">
        {marbleSections.map((section, i) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(i)}
            className={`shrink-0 px-4 py-2 text-[10px] uppercase tracking-[0.15em] transition-all ${
              activeIndex === i ? "text-luxury-gold" : "text-white/30 hover:text-white/60"
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export { CollectionNav };
