"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MarbleSection } from "@/types";

interface Props {
  section: MarbleSection;
  size?: "sm" | "lg";
  showLabel?: boolean;
  onSelect?: () => void;
}

export default function MarbleHoverCard({ section, size = "sm", showLabel = true, onSelect }: Props) {
  const [hovered, setHovered] = useState(false);

  const aspect = size === "lg" ? "aspect-[3/4]" : "aspect-[4/5]";

  const inner = (
    <>
      <div className={`relative ${aspect} overflow-hidden bg-neutral-900`}>
        <Image
          src={section.slabImage}
          alt={section.title}
          fill
          className={`object-cover transition-opacity duration-300 ease-out ${hovered ? "opacity-0" : "opacity-100"}`}
          sizes={size === "lg" ? "50vw" : "33vw"}
        />
        <Image
          src={section.interiorImage}
          alt={section.interiorLabel}
          fill
          className={`object-cover transition-opacity duration-300 ease-out ${hovered ? "opacity-100" : "opacity-0"}`}
          sizes={size === "lg" ? "50vw" : "33vw"}
        />
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold">{section.interiorLabel}</p>
        </div>
        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-white/20 bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRight size={14} className="text-luxury-gold" />
        </div>
      </div>
      {showLabel && (
        <p className="mt-4 text-center text-[11px] uppercase tracking-[0.35em] text-luxury-cream/80 transition-colors group-hover:text-luxury-gold">
          {section.title}
        </p>
      )}
    </>
  );

  if (onSelect) {
    return (
      <button type="button" className="group block w-full text-left" onClick={onSelect}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {inner}
      </button>
    );
  }

  return (
    <Link href={`/collections?marble=${section.id}`} className="group block"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {inner}
    </Link>
  );
}
