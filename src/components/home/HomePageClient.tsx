"use client";

import dynamic from "next/dynamic";
import MarbleCollectionGrid from "@/components/home/MarbleCollectionGrid";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";

const MarbleScrollExperience = dynamic(
  () => import("@/components/showroom/MarbleScrollExperience"),
  { ssr: false, loading: () => <div className="h-screen bg-luxury-black" /> }
);

export default function HomePageClient() {
  return (
    <>
      <MarbleScrollExperience />
      <MarbleCollectionGrid />
      <FeaturesSection />
      <CTASection />
    </>
  );
}
