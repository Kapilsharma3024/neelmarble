"use client";

import Image from "next/image";
import { marbleSections } from "@/data/products";
import { useShowroom } from "./ShowroomContext";

export default function InteriorBackground() {
  const { activeIndex } = useShowroom();
  const active = marbleSections[activeIndex];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* All interior layers mounted — instant opacity swap */}
      {marbleSections.map((section, i) => (
        <div
          key={section.id}
          className="absolute inset-0"
          style={{
            opacity: activeIndex === i ? 1 : 0,
            visibility: activeIndex === i ? "visible" : "hidden",
            transition: "none",
            willChange: "opacity",
          }}
        >
          <Image
            src={section.interiorImage}
            alt={section.interiorLabel}
            fill
            className="object-cover"
            sizes="100vw"
            priority={i <= 2}
          />
        </div>
      ))}

      {/* Instant color wash — no transition */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `${active.bgColor}cc`, transition: "none" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
    </div>
  );
}
