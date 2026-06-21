"use client";

import { motion, AnimatePresence } from "framer-motion";
import { marbleShowcase } from "@/data/marbleShowcase";
import { useMarbleScroll } from "@/hooks/useMarbleScrollContext";

export default function BackgroundLayer() {
  const { activeIndex } = useMarbleScroll();
  const marble = marbleShowcase[activeIndex];

  return (
    <div className="absolute inset-0 z-0 bg-luxury-black">
      <AnimatePresence mode="sync">
        <motion.div
          key={marble.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={marble.background} alt="" className="h-full w-full object-cover" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />
    </div>
  );
}
