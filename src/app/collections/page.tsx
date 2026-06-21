"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { products, categories, applications } from "@/data/products";
import { marbleSections } from "@/data/collections";
import MarbleHoverCard from "@/components/marble/MarbleHoverCard";
import ProductModal from "@/components/collections/ProductModal";
import { MarbleProduct } from "@/types";

function CollectionsContent() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [application, setApplication] = useState("");
  const [selected, setSelected] = useState<MarbleProduct | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("marble") || params.get("product");
    if (id) {
      const p = products.find((pr) => pr.id === id);
      if (p) setSelected(p);
    }
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" || p.category === category;
      const matchApp = !application || p.application.includes(application);
      return matchSearch && matchCategory && matchApp;
    });
  }, [search, category, application]);

  return (
    <div className="min-h-screen bg-luxury-black pt-24 sm:pt-28">
      <div className="section-padding mx-auto max-w-7xl pb-24 sm:pb-32">
        <div className="mb-8 sm:mb-12">
          <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-luxury-gold sm:mb-3 sm:tracking-[0.5em]">
            {marbleSections.length} Collections
          </p>
          <h1 className="heading-display text-luxury-cream">
            Indian <span className="gold-text">Marble</span>
          </h1>
          <p className="mt-3 max-w-xl text-xs text-luxury-cream/50 sm:mt-4 sm:text-sm">
            Tap any slab to preview installed result — hover on desktop
          </p>
        </div>

        <div className="mb-8 space-y-3 sm:mb-10 sm:space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-cream/40 sm:left-4" size={18} />
            <input
              type="text"
              placeholder="Search 20+ marbles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-white/10 bg-luxury-charcoal py-3 pl-10 pr-4 text-sm text-luxury-cream focus:border-luxury-gold focus:outline-none sm:py-4 sm:pl-12"
            />
          </div>
          <select
            value={application}
            onChange={(e) => setApplication(e.target.value)}
            className="w-full border border-white/10 bg-luxury-charcoal px-4 py-2.5 text-xs uppercase text-luxury-cream sm:w-auto sm:py-2"
          >
            <option value="">All Applications</option>
            {applications.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3 min-[480px]:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-8">
          {filtered.map((product) => {
            const section = marbleSections.find((s) => s.id === product.id);
            if (!section) return null;
            return (
              <MarbleHoverCard key={product.id} section={section} onSelect={() => setSelected(product)} />
            );
          })}
        </div>

        <ProductModal product={selected} onClose={() => setSelected(null)} />
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-luxury-black" />}>
      <CollectionsContent />
    </Suspense>
  );
}
