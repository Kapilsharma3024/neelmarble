"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { products } from "@/data/products";
import { ScrollShowroomProvider } from "./ScrollContext";
import CollectionsScrollContent from "./CollectionsScrollContent";

const MarbleCanvas = dynamic(() => import("./MarbleCanvas"), { ssr: false });

const collectionItems = products.filter((p) => p.featured).slice(0, 6);
const collectionTextures = collectionItems.map((p) => p.texture);

interface Props {
  startIndex?: number;
}

export default function CollectionsShowroom({ startIndex = 0 }: Props) {
  return (
    <ScrollShowroomProvider texturePaths={collectionTextures}>
      <Suspense fallback={<div className="h-screen bg-luxury-black" />}>
        <CollectionsScrollContent MarbleCanvas={MarbleCanvas} startIndex={startIndex} />
      </Suspense>
    </ScrollShowroomProvider>
  );
}

export { collectionItems };
