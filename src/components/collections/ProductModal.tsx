"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Ruler, Layers, MapPin } from "lucide-react";
import { MarbleProduct } from "@/types";
import Link from "next/link";

interface ProductModalProps {
  product: MarbleProduct | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [showInstalled, setShowInstalled] = useState(false);

  if (!product) return null;

  const allImages = [
    product.texture,
    ...(product.interiorPreview ? [product.interiorPreview] : []),
    ...product.images.filter((img) => img !== product.texture),
  ];
  const uniqueImages = [...new Set(allImages)];
  const displayImages = showInstalled && product.interiorPreview
    ? [product.interiorPreview, product.texture]
    : uniqueImages;
  const currentImage = displayImages[imageIndex] ?? product.texture;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-luxury-black/90 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto bg-luxury-charcoal border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 text-luxury-cream/60 hover:text-luxury-gold transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <div className="grid lg:grid-cols-2">
            <div className="relative">
              <div className="relative aspect-square bg-luxury-black">
                <Image src={currentImage} alt={product.name} fill className="object-cover" />
                {displayImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setImageIndex((i) => (i - 1 + displayImages.length) % displayImages.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-luxury-black/50 text-luxury-cream hover:text-luxury-gold"
                      aria-label="Previous"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setImageIndex((i) => (i + 1) % displayImages.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-luxury-black/50 text-luxury-cream hover:text-luxury-gold"
                      aria-label="Next"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {product.interiorPreview && (
                <div className="flex border-t border-white/10">
                  <button
                    onClick={() => { setShowInstalled(false); setImageIndex(0); }}
                    className={`flex-1 py-3 text-[10px] uppercase tracking-wider ${!showInstalled ? "bg-luxury-gold text-luxury-black" : "text-luxury-cream/50"}`}
                  >
                    Raw Slab
                  </button>
                  <button
                    onClick={() => { setShowInstalled(true); setImageIndex(0); }}
                    className={`flex-1 py-3 text-[10px] uppercase tracking-wider ${showInstalled ? "bg-luxury-gold text-luxury-black" : "text-luxury-cream/50"}`}
                  >
                    Installed
                  </button>
                </div>
              )}
            </div>

            <div className="p-8 lg:p-12">
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-luxury-gold">{product.subcategory}</p>
              <h2 className="heading-section mb-4 text-luxury-cream">{product.name}</h2>
              <p className="mb-8 text-sm leading-relaxed text-luxury-cream/60">{product.description}</p>

              <div className="mb-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-luxury-cream/70">
                  <Ruler size={16} className="text-luxury-gold" />
                  <span>Dimensions: {product.dimensions}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-luxury-cream/70">
                  <Layers size={16} className="text-luxury-gold" />
                  <span>Finish: {product.finish}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-luxury-cream/70">
                  <MapPin size={16} className="mt-0.5 text-luxury-gold" />
                  <span>Application: {product.application.join(", ")}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/quote" className="btn-primary flex-1 text-center text-xs">Request Quote</Link>
                <Link href="/contact" className="btn-secondary flex-1 text-center text-xs">Contact Us</Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
