"use client";

import { useEffect } from "react";
import { marbleShowcase } from "@/data/marbleShowcase";

export function useImagePreload() {
  useEffect(() => {
    const urls = marbleShowcase.flatMap((s) => [s.marbleImage, s.background]);
    urls.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);
}
