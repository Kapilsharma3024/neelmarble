"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search } from "lucide-react";
import { products, categories, applications, subcategories } from "@/data/products";
import { MarbleProduct } from "@/types";
import ProductModal from "./ProductModal";

export default function CollectionsGrid() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [application, setApplication] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<MarbleProduct | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat");
    const productId = params.get("product");
    if (cat) setCategory(cat);
    if (productId) {
      const p = products.find((pr) => pr.id === productId);
      if (p) setSelectedProduct(p);
    }
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" || p.category === category;
      const matchApp = !application || p.application.includes(application);
      const matchSub = !subcategory || p.subcategory === subcategory;
      return matchSearch && matchCategory && matchApp && matchSub;
    });
  }, [search, category, application, subcategory]);

  return (
    <>
      <div className="mb-12 space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-cream/40" size={18} />
          <input
            type="text"
            placeholder="Search marble collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-white/10 bg-luxury-charcoal py-4 pl-12 pr-4 text-sm text-luxury-cream placeholder:text-luxury-cream/30 focus:border-luxury-gold focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] transition-all ${
                category === cat.id
                  ? "bg-luxury-gold text-luxury-black"
                  : "border border-white/10 text-luxury-cream/60 hover:border-luxury-gold/50 hover:text-luxury-gold"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="border border-white/10 bg-luxury-charcoal px-4 py-2 text-xs uppercase tracking-wider text-luxury-cream focus:border-luxury-gold focus:outline-none"
          >
            <option value="">All Types</option>
            {subcategories.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={application}
            onChange={(e) => setApplication(e.target.value)}
            className="border border-white/10 bg-luxury-charcoal px-4 py-2 text-xs uppercase tracking-wider text-luxury-cream focus:border-luxury-gold focus:outline-none"
          >
            <option value="">All Applications</option>
            {applications.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group cursor-pointer"
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setSelectedProduct(product)}
          >
            <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-luxury-black">
              <Image
                src={hoveredId === product.id && product.interiorPreview ? product.interiorPreview : product.texture}
                alt={product.name}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-luxury-gold/30" />
              {hoveredId === product.id && product.interiorPreview && (
                <div className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 text-[10px] uppercase tracking-wider text-luxury-gold backdrop-blur-sm">
                  Installed Preview
                </div>
              )}
            </div>
            <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
              {product.subcategory}
            </p>
            <h3 className="font-display text-xl text-luxury-cream group-hover:text-luxury-gold transition-colors">
              {product.name}
            </h3>
            <p className="mt-1 text-xs text-luxury-cream/40">{product.finish} · {product.dimensions}</p>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-luxury-cream/40">No products match your filters.</p>
      )}

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
