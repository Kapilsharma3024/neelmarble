"use client";

import { useRef, useState, MouseEvent } from "react";
import Image from "next/image";
import { marbleSections } from "@/data/products";
import { useShowroom } from "./ShowroomContext";

export default function MarbleDisplay() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { activeIndex, showInstalled } = useShowroom();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 12 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="relative flex h-full w-full items-center justify-center px-4 lg:px-8">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-lg"
        style={{ perspective: "1200px" }}
      >
        <div
          className="relative"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.1s ease-out",
          }}
        >
          <div className="absolute -inset-3 rounded-sm border border-luxury-gold/20 bg-gradient-to-br from-luxury-gold/5 to-transparent" />

          <div className="relative aspect-[3/4] overflow-hidden shadow-2xl shadow-black/60">
            {marbleSections.map((section, i) => {
              const src = showInstalled ? section.interiorImage : section.slabImage;
              const label = showInstalled ? section.interiorLabel : "Raw Marble Slab";
              const isActive = activeIndex === i;

              return (
                <div
                  key={section.id}
                  className="absolute inset-0"
                  style={{
                    opacity: isActive ? 1 : 0,
                    visibility: isActive ? "visible" : "hidden",
                    transition: "none",
                  }}
                >
                  <Image
                    src={src}
                    alt={section.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 500px"
                    priority={i <= 2}
                  />
                  {isActive && (
                    <div className="absolute bottom-4 left-4 border border-white/10 bg-black/50 px-3 py-1.5 backdrop-blur-md">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
                        {label}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/10" />
          </div>

          <div className="absolute -bottom-4 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-full bg-black/40 blur-xl" />
        </div>
      </div>
    </div>
  );
}
