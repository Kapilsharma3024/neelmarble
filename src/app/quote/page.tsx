import { createMetadata } from "@/lib/seo";
import QuoteForm from "@/components/contact/QuoteForm";

export const metadata = createMetadata(
  "Request Quote",
  "Request a customized quote for your marble project. Upload designs and specify your requirements.",
  "/quote"
);

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-luxury-black pt-32">
      <div className="section-padding mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.5em] text-luxury-gold">Custom Quote</p>
          <h1 className="heading-display text-luxury-cream">
            Request a <span className="gold-text">Quote</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm text-luxury-cream/60">
            Fill in your project details and our team will prepare a personalized quote within 48 hours.
          </p>
        </div>
        <QuoteForm />
      </div>
    </div>
  );
}
