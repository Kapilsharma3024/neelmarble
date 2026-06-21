"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const MarbleScene = dynamic(() => import("./MarbleScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-luxury-black">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-luxury-gold border-t-transparent" />
    </div>
  ),
});

export default function Hero3D() {
  return (
    <div className="relative h-screen w-full">
      <Suspense fallback={null}>
        <MarbleScene />
      </Suspense>
    </div>
  );
}
