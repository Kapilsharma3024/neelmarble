"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ArrowLeftRight } from "lucide-react";
import { galleryProjects } from "@/data/products";

export default function GalleryMasonry() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showBefore, setShowBefore] = useState(false);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(galleryProjects.map((p) => p.category)))];
  const filtered = filter === "All" ? galleryProjects : galleryProjects.filter((p) => p.category === filter);

  const current = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:mb-12 sm:flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`shrink-0 px-3 py-2 text-[10px] uppercase tracking-[0.12em] transition-all sm:px-4 sm:text-xs sm:tracking-[0.15em] ${
              filter === cat
                ? "bg-luxury-gold text-luxury-black"
                : "border border-white/10 text-luxury-cream/60 hover:text-luxury-gold"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {filtered.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="mb-6 break-inside-avoid cursor-pointer group"
            onClick={() => setLightboxIndex(i)}
          >
            <div className="relative overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={600}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-xs uppercase tracking-[0.2em] text-luxury-gold">{project.category}</p>
                <h3 className="font-display text-xl text-luxury-cream">{project.title}</h3>
                <p className="text-xs text-luxury-cream/60">{project.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {current && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-luxury-black/95 p-0 backdrop-blur-md sm:items-center sm:p-4"
            onClick={() => { setLightboxIndex(null); setShowBefore(false); }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[92dvh] w-full max-w-4xl overflow-y-auto sm:max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { setLightboxIndex(null); setShowBefore(false); }}
                className="absolute right-4 top-4 z-10 text-luxury-cream hover:text-luxury-gold"
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>

              <div className="relative aspect-video bg-luxury-charcoal">
                <Image
                  src={showBefore && current.beforeImage ? current.beforeImage : current.image}
                  alt={current.title}
                  fill
                  className="object-cover"
                />
                {current.beforeImage && (
                  <button
                    onClick={() => setShowBefore(!showBefore)}
                    className="absolute bottom-4 right-4 flex items-center gap-2 bg-luxury-black/70 px-4 py-2 text-xs uppercase tracking-wider text-luxury-cream hover:text-luxury-gold"
                  >
                    <ArrowLeftRight size={14} />
                    {showBefore ? "After" : "Before / After"}
                  </button>
                )}
              </div>

              <div className="border border-white/10 bg-luxury-charcoal p-5 sm:p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-luxury-gold">{current.category}</p>
                <h2 className="heading-section mt-2 text-luxury-cream">{current.title}</h2>
                <p className="mt-1 text-sm text-luxury-cream/50">{current.location}</p>
                <p className="mt-4 text-sm leading-relaxed text-luxury-cream/60">{current.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
