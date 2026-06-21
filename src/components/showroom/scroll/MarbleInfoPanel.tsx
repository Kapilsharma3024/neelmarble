"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { marbleShowcase } from "@/data/marbleShowcase";
import { useMarbleScroll } from "@/hooks/useMarbleScrollContext";

export default function MarbleInfoPanel() {
  const { activeIndex, direction } = useMarbleScroll();
  const marble = marbleShowcase[activeIndex];

  return (
    <div className="relative z-20 flex h-full flex-col justify-center px-6 py-28 lg:w-[38%] lg:max-w-xl lg:px-12 lg:py-0 xl:w-[36%]">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={marble.id}
          custom={direction}
          initial={{ opacity: 0, y: direction >= 0 ? 32 : -32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: direction >= 0 ? -32 : 32 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] uppercase tracking-[0.55em] text-luxury-gold/80">
            Collection {String(activeIndex + 1).padStart(2, "0")}
          </p>

          {marble.subtitle && (
            <p className="mt-2 text-xs uppercase tracking-[0.28em] text-luxury-cream/45">{marble.subtitle}</p>
          )}

          <h1 className="mt-4 font-display text-4xl font-light leading-[0.95] text-luxury-cream md:text-5xl lg:text-6xl">
            {marble.name}
          </h1>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-luxury-cream/65">{marble.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {marble.applications.map((app) => (
              <span
                key={app}
                className="border border-white/15 px-3 py-1.5 text-[10px] uppercase tracking-wider text-luxury-cream/70"
              >
                {app}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/collections" className="btn-primary py-3 px-6 text-[10px]">
              View Collection <ArrowRight size={12} />
            </Link>
            <Link href="/quote" className="btn-secondary py-3 px-6 text-[10px]">
              Enquire Now
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
