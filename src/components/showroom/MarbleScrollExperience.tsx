"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { marbleShowcase } from "@/data/marbleShowcase";
import { getLenis } from "@/lib/lenis";
import { MarbleScrollProvider, useMarbleScroll } from "@/hooks/useMarbleScrollContext";
import BackgroundLayer from "./scroll/BackgroundLayer";
import MarbleInfoPanel from "./scroll/MarbleInfoPanel";
import MarbleSlabCenter from "./scroll/MarbleSlabCenter";

gsap.registerPlugin(ScrollTrigger);

function CollectionNav() {
  const { activeIndex, scrollToSection } = useMarbleScroll();
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/60 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-7xl items-center overflow-x-auto px-2 py-2.5 scrollbar-hide sm:py-3">
        {marbleShowcase.map((m, i) => (
          <button
            key={m.id}
            onClick={() => scrollToSection(i)}
            className={`shrink-0 px-2.5 py-1.5 text-[8px] uppercase tracking-[0.1em] transition-colors sm:px-3 sm:text-[9px] md:text-[10px] md:tracking-[0.12em] ${
              activeIndex === i ? "text-luxury-gold" : "text-white/35 hover:text-white/60"
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function ScrollController() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lastIndex = useRef(0);
  const { setActiveIndex, setDirection, registerScrollTo } = useMarbleScroll();

  useEffect(() => {
    marbleShowcase.forEach((m) => {
      [m.marbleImage, m.background].forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    const total = marbleShowcase.length;
    const steps = total - 1;
    const scrollDistance = steps * window.innerHeight;

    registerScrollTo((index) => {
      const top = containerRef.current!.offsetTop + (index / steps) * scrollDistance;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(top, { duration: 1.1 });
      else window.scrollTo({ top, behavior: "smooth" });
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: pinRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        // discrete snapping → no per-frame churn, buttery section changes
        snap: {
          snapTo: 1 / steps,
          duration: { min: 0.25, max: 0.5 },
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const index = Math.round(self.progress * steps);
          if (index !== lastIndex.current) {
            setDirection(index > lastIndex.current ? 1 : -1);
            lastIndex.current = index;
            setActiveIndex(index);
          }
        },
      });
    }, containerRef);

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [setActiveIndex, setDirection, registerScrollTo]);

  return (
    <div ref={containerRef}>
      <div ref={pinRef} className="relative h-[100dvh] min-h-[520px] w-full overflow-hidden">
        {/* Background — luxury interior using the SAME marble */}
        <BackgroundLayer />

        <div className="pointer-events-none absolute left-1/2 top-4 z-30 -translate-x-1/2 sm:top-8">
          <p className="text-[9px] uppercase tracking-[0.5em] text-luxury-cream/30 sm:text-[10px] sm:tracking-[0.7em]">Scroll</p>
        </div>

        <div className="relative z-10 grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] lg:flex lg:flex-row">
          {/* LEFT — title, description, applications, CTA */}
          <MarbleInfoPanel />

          {/* CENTER — marble product slab ONLY */}
          <MarbleSlabCenter />
        </div>

        <CollectionNav />
      </div>
    </div>
  );
}

export default function MarbleScrollExperience() {
  return (
    <MarbleScrollProvider totalSections={marbleShowcase.length}>
      <ScrollController />
    </MarbleScrollProvider>
  );
}
