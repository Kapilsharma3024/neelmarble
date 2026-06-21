import { createMetadata } from "@/lib/seo";
import ContactForm from "@/components/contact/ContactForm";
import { ContactInfo, GoogleMap } from "@/components/contact/ContactExtras";

export const metadata = createMetadata(
  "Contact Us",
  "Get in touch with NeelMarble for premium Indian marble inquiries. Visit our showroom in Kishangarh, Rajasthan.",
  "/contact"
);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-luxury-black">
      <section className="flex min-h-[40vh] items-center pt-32 section-padding">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs uppercase tracking-[0.5em] text-luxury-gold">Get In Touch</p>
          <h1 className="heading-display text-luxury-cream">
            Contact <span className="gold-text">Us</span>
          </h1>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <ContactForm />
          <div className="space-y-8">
            <ContactInfo />
            <GoogleMap />
          </div>
        </div>
      </section>
    </div>
  );
}
