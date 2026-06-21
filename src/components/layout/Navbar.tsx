"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-12 md:py-6">
       <Link href="/" className="group flex min-w-0 items-center gap-2 sm:gap-3" > <Image src="/logo/neelmarble.png" alt="Neel Marble Logo" width={56} height={56} priority className="h-10 w-auto shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-12 md:h-[56px]" /> 
       <div className="flex min-w-0 flex-col justify-center leading-none">
          <span className="font-display text-lg font-light tracking-[0.2em] text-luxury-cream transition-colors group-hover:text-luxury-gold sm:text-xl sm:tracking-[0.25em] md:text-2xl md:tracking-[0.3em]">
            NEEL
          </span>
          <span className="text-[8px] uppercase tracking-[0.35em] text-luxury-gold sm:text-[9px] sm:tracking-[0.45em] md:text-[10px] md:tracking-[0.5em]">
            Marble
          </span>
        </div>
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
            <div className="flex flex-col gap-5 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8">
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
