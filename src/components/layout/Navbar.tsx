"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/quote", label: "Get Quote" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-700",
        scrolled
          ? "border-b border-white/5 bg-luxury-black/90 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12">
        <Link href="/" className="group flex flex-col">
          <span className="font-display text-2xl font-light tracking-[0.3em] text-luxury-cream transition-colors group-hover:text-luxury-gold">
            NEEL
          </span>
          <span className="text-[10px] uppercase tracking-[0.5em] text-luxury-gold">
            Marble
          </span>
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-xs uppercase tracking-[0.2em] transition-colors duration-300",
                pathname === link.href
                  ? "text-luxury-gold"
                  : "text-luxury-cream/70 hover:text-luxury-gold"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 h-px w-full bg-luxury-gold"
                />
              )}
            </Link>
          ))}
        </div>

        <Link href="/quote" className="btn-primary hidden text-xs lg:inline-flex">
          Request Quote
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-luxury-cream lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5 bg-luxury-black/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm uppercase tracking-[0.2em]",
                      pathname === link.href
                        ? "text-luxury-gold"
                        : "text-luxury-cream/70"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link href="/quote" className="btn-primary mt-4 text-center text-xs">
                Request Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
