"use client";

import { useRef, useState, MouseEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MarbleSection } from "@/types";
import { useShowroom } from "./ShowroomContext";

interface Props {
  section: MarbleSection;
  isActive: boolean;
}

export default function MarbleSlabCard({ section, isActive }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { showInstalled } = useShowroom();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 14 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const displayImage = showInstalled ? section.interiorImage : section.slabImage;
  const label = showInstalled ? section.interiorLabel : "Raw Marble Slab";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.92 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full w-full items-center justify-center px-4 lg:px-8"
      style={{ pointerEvents: isActive ? "auto" : "none" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-lg"
        style={{ perspective: "1200px" }}
      >
        <div
          className="relative transition-transform duration-200 ease-out"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Premium frame */}
          <div className="absolute -inset-3 rounded-sm border border-luxury-gold/20 bg-gradient-to-br from-luxury-gold/5 to-transparent" />

          {/* Slab image */}
          <div className="relative aspect-[3/4] overflow-hidden shadow-2xl shadow-black/60">
            <motion.div
              key={displayImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative h-full w-full"
            >
              <Image
                src={displayImage}
                alt={section.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 500px"
                priority={isActive}
              />
            </motion.div>

            {/* Premium lighting overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/10" />
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background: `radial-gradient(circle at ${50 + tilt.y * 2}% ${50 + tilt.x * 2}%, rgba(201,169,98,0.15), transparent 60%)`,
              }}
            />

            {/* Label badge */}
            <div className="absolute bottom-4 left-4 border border-white/10 bg-black/50 px-3 py-1.5 backdrop-blur-md">
              <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
                {label}
              </span>
            </div>
          </div>

          {/* Depth shadow */}
          <div
            className="absolute -bottom-4 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-full bg-black/40 blur-xl"
            style={{ transform: `translateX(-50%) scaleX(${1 + Math.abs(tilt.y) * 0.02})` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
