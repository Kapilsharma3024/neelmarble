import Link from "next/link";
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-luxury-charcoal">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center gap-4">

            <Image
              src="/logo/neelmarble.png"
              alt="Neel Marble Logo"
              width={72}
              height={72}
              className="h-[72px] w-auto shrink-0 object-contain"
            />

            <div className="flex flex-col justify-center leading-none">
              <span className="font-display text-3xl font-light tracking-[0.3em] text-luxury-cream">
                NEEL
              </span>
              <span className="ml-2 text-xs uppercase tracking-[0.5em] text-luxury-gold">
                Marble
              </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-luxury-cream/60">
              Premium Indian marble sourced from the finest quarries. Crafting
              luxury spaces since 1998.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-xs uppercase tracking-[0.3em] text-luxury-gold">
              Collections
            </h4>
            <ul className="space-y-3 text-sm text-luxury-cream/60">
              <li><Link href="/collections?cat=indian" className="hover:text-luxury-gold transition-colors">Indian Marble</Link></li>
              <li><Link href="/collections?cat=flooring" className="hover:text-luxury-gold transition-colors">Flooring</Link></li>
              <li><Link href="/collections?cat=wall-cladding" className="hover:text-luxury-gold transition-colors">Wall Cladding</Link></li>
              <li><Link href="/collections?cat=countertop" className="hover:text-luxury-gold transition-colors">Countertops</Link></li>
              <li><Link href="/collections?cat=premium" className="hover:text-luxury-gold transition-colors">Premium Collection</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs uppercase tracking-[0.3em] text-luxury-gold">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-luxury-cream/60">
              <li><Link href="/about" className="hover:text-luxury-gold transition-colors">About Us</Link></li>
              <li><Link href="/gallery" className="hover:text-luxury-gold transition-colors">Projects</Link></li>
              <li><Link href="/contact" className="hover:text-luxury-gold transition-colors">Contact</Link></li>
              <li><Link href="/quote" className="hover:text-luxury-gold transition-colors">Get Quote</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs uppercase tracking-[0.3em] text-luxury-gold">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-luxury-cream/60">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-luxury-gold" />
                Marble Market, Kishangarh, Rajasthan 305801
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-luxury-gold" />
                +91 9634414092
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-luxury-gold" />
                info@neelmarble.com
              </li>
            </ul>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-luxury-cream/40 hover:text-luxury-gold transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-luxury-cream/40 hover:text-luxury-gold transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-luxury-cream/40">
            © {new Date().getFullYear()} NeelMarble. All rights reserved.
          </p>
          <p className="text-xs text-luxury-cream/40">
            Crafted with precision · Premium Natural Stone
          </p>
        </div>
      </div>
    </footer>
  );
}
