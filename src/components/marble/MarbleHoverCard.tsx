"use client";

import { useState, useCallback } from "react";
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

  const handleTap = useCallback(
    (e: React.MouseEvent) => {
      if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
        if (!hovered) {
          e.preventDefault();
          setHovered(true);
        }
      }
    },
    [hovered]
  );

  const pointerHandlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick: handleTap,
  };

  const inner = (
    <>
      <div className={`relative ${aspect} overflow-hidden bg-neutral-900`}>
        <Image
          src={section.slabImage}
          alt={section.title}
          fill
          className={`object-cover transition-opacity duration-300 ease-out ${hovered ? "opacity-0" : "opacity-100"}`}
          sizes={size === "lg" ? "(max-width: 768px) 50vw, 33vw" : "(max-width: 640px) 45vw, 25vw"}
        />
        <Image
          src={section.interiorImage}
          alt={section.interiorLabel}
          fill
          className={`object-cover transition-opacity duration-300 ease-out ${hovered ? "opacity-100" : "opacity-0"}`}
          sizes={size === "lg" ? "(max-width: 768px) 50vw, 33vw" : "(max-width: 640px) 45vw, 25vw"}
        />
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 transition-opacity duration-300 sm:p-4 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-[9px] uppercase tracking-[0.2em] text-luxury-gold sm:text-[10px] sm:tracking-[0.25em]">
            {section.interiorLabel}
          </p>
        </div>
        <div
          className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm transition-opacity duration-300 sm:right-3 sm:top-3 sm:h-8 sm:w-8 ${
            hovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <ArrowUpRight size={14} className="text-luxury-gold" />
        </div>
        {!hovered && (
          <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-0.5 text-[8px] uppercase tracking-wider text-luxury-cream/70 backdrop-blur-sm sm:hidden">
            Tap to preview
          </span>
        )}
      </div>
      {showLabel && (
        <p className="mt-2 truncate text-center text-[10px] uppercase tracking-[0.25em] text-luxury-cream/80 transition-colors group-hover:text-luxury-gold sm:mt-4 sm:text-[11px] sm:tracking-[0.35em]">
          {section.title}
        </p>
      )}
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        className="group block w-full min-w-0 text-left"
        onClick={(e) => {
          handleTap(e);
          if (!e.defaultPrevented) onSelect();
        }}
        onMouseEnter={pointerHandlers.onMouseEnter}
        onMouseLeave={pointerHandlers.onMouseLeave}
      >
        {inner}
      </button>
    );
  }

  return (
    <Link
      href={`/collections?marble=${section.id}`}
      className="group block min-w-0"
      {...pointerHandlers}
    >
      {inner}
    </Link>
  );
}
