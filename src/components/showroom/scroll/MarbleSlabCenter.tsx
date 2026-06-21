"use client";

import { motion, AnimatePresence } from "framer-motion";
import { marbleShowcase } from "@/data/marbleShowcase";
import { useMarbleScroll } from "@/hooks/useMarbleScrollContext";

export default function MarbleSlabCenter() {
  const { activeIndex, direction } = useMarbleScroll();
  const marble = marbleShowcase[activeIndex];

  return (
    <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-3 pb-[4.5rem] sm:px-4 sm:pb-20 lg:pb-16">
      <div
        className="marble-float relative h-full max-h-[min(42dvh,320px)] w-auto max-w-[min(52vw,200px)] sm:max-h-[min(48dvh,360px)] sm:max-w-[240px] md:max-w-[300px] lg:max-h-none lg:max-w-[380px] lg:w-full"
        style={{ perspective: "1400px" }}
      >
        <div className="absolute -bottom-4 left-1/2 h-5 w-[65%] -translate-x-1/2 rounded-[100%] bg-black/60 blur-2xl sm:-bottom-6 sm:h-7" />

        <div className="relative aspect-[2/3] h-full w-full max-h-full" style={{ transformStyle: "preserve-3d" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={marble.id}
              className="absolute inset-0 overflow-hidden rounded-sm border border-white/15 shadow-[0_24px_50px_rgba(0,0,0,0.7)] sm:shadow-[0_36px_70px_rgba(0,0,0,0.7)]"
              custom={direction}
              initial={{ opacity: 0, rotateY: direction >= 0 ? 45 : -45, scale: 0.9 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: direction >= 0 ? -45 : 45, scale: 0.9 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={marble.marbleImage}
                alt={`${marble.name} marble slab`}
                className="h-full w-full object-cover"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/25" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
