"use client";

import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";

export default function WhatsAppButton() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || "919876543210";
  const message = encodeURIComponent("Hello NeelMarble, I'm interested in your marble collections.");

  return (
    <a
      href={`https://wa.me/${whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4">
        <MapPin className="mt-1 shrink-0 text-luxury-gold" size={20} />
        <div>
          <h4 className="text-sm uppercase tracking-wider text-luxury-cream">Office</h4>
          <p className="mt-1 text-sm text-luxury-cream/60">
            Marble Market, Kishangarh<br />
            Rajasthan 305801, India
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <Phone className="mt-1 shrink-0 text-luxury-gold" size={20} />
        <div>
          <h4 className="text-sm uppercase tracking-wider text-luxury-cream">Phone</h4>
          <p className="mt-1 text-sm text-luxury-cream/60">+91 96344 14092</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <Mail className="mt-1 shrink-0 text-luxury-gold" size={20} />
        <div>
          <h4 className="text-sm uppercase tracking-wider text-luxury-cream">Email</h4>
          <p className="mt-1 text-sm text-luxury-cream/60">info@neelmarble.com</p>
        </div>
      </div>
    </div>
  );
}

export function GoogleMap() {
  return (
    <div className="relative h-80 w-full overflow-hidden border border-white/10 bg-luxury-charcoal">
      <iframe
        title="NeelMarble Office Location"
         src="https://maps.google.com/maps?q=27.228754,78.050324&z=15&output=embed"
        //src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.5!2d74.85!3d26.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDM0JzQ4LjAiTiA3NMKwNTEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
        width="100%"
        height="100%"
        style={{ border: 0, filter: "grayscale(80%) contrast(1.1)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
