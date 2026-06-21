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
    <div className="relative z-20 flex min-h-0 flex-col justify-end px-4 pb-2 pt-[4.5rem] sm:px-6 sm:pb-3 sm:pt-24 lg:h-full lg:w-[38%] lg:max-w-xl lg:justify-center lg:px-12 lg:py-0 xl:w-[36%]">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={marble.id}
          custom={direction}
          initial={{ opacity: 0, y: direction >= 0 ? 24 : -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: direction >= 0 ? -24 : 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[9px] uppercase tracking-[0.35em] text-luxury-gold/80 sm:text-[10px] sm:tracking-[0.55em]">
            Collection {String(activeIndex + 1).padStart(2, "0")}
          </p>

          {marble.subtitle && (
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-luxury-cream/45 sm:mt-2 sm:text-xs sm:tracking-[0.28em]">
              {marble.subtitle}
            </p>
          )}

          <h1 className="mt-2 font-display text-2xl font-light leading-[0.95] text-luxury-cream sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
            {marble.name}
          </h1>

          <p className="mt-3 line-clamp-3 max-w-md text-xs leading-relaxed text-luxury-cream/65 sm:mt-6 sm:line-clamp-none sm:text-sm">
            {marble.description}
          </p>

          <div className="mt-3 hidden flex-wrap gap-1.5 sm:mt-6 sm:flex sm:gap-2">
            {marble.applications.map((app) => (
              <span
                key={app}
                className="border border-white/15 px-2 py-1 text-[9px] uppercase tracking-wider text-luxury-cream/70 sm:px-3 sm:py-1.5 sm:text-[10px]"
              >
                {app}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-row gap-2 sm:mt-10 sm:flex-col sm:gap-3 md:flex-row">
            <Link href="/collections" className="btn-primary flex-1 py-2.5 px-4 text-[9px] sm:flex-none sm:py-3 sm:px-6 sm:text-[10px]">
              View Collection <ArrowRight size={12} />
            </Link>
            <Link href="/quote" className="btn-secondary flex-1 py-2.5 px-4 text-[9px] sm:flex-none sm:py-3 sm:px-6 sm:text-[10px]">
              Enquire Now
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
