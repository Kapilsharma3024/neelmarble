"use client";

import dynamic from "next/dynamic";
import { ScrollShowroomProvider } from "./ScrollContext";
import ScrollShowroomContent from "./ScrollShowroomContent";

const MarbleCanvas = dynamic(() => import("./MarbleCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-luxury-gold border-t-transparent" />
    </div>
  ),
});

export default function ScrollShowroom() {
  return (
    <ScrollShowroomProvider>
      <ScrollShowroomContent MarbleCanvas={MarbleCanvas} />
    </ScrollShowroomProvider>
  );
}
