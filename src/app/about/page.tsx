import { createMetadata } from "@/lib/seo";
import AboutTimeline, { StatisticsSection, ProcessSection, WhyChooseUs } from "@/components/about/AboutSections";

export const metadata = createMetadata(
  "About Us",
  "Learn about LuxMarble's 25+ year legacy in premium Indian marble. Our story, manufacturing process, and commitment to excellence.",
  "/about"
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-luxury-black">
      <section className="flex min-h-[60vh] items-center pt-32 section-padding">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs uppercase tracking-[0.5em] text-luxury-gold">Our Story</p>
          <h1 className="heading-display max-w-3xl text-luxury-cream">
            Crafting Luxury
            <br />
            <span className="gold-text">Since 1998</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-luxury-cream/60">
            From the heart of Rajasthan&apos;s marble belt, LuxMarble has been sourcing and crafting
            the finest Indian marble for over two decades. What began as a small quarry operation
            has grown into a global brand trusted by architects and designers worldwide.
          </p>
        </div>
      </section>
      <StatisticsSection />
      <ProcessSection />
      <AboutTimeline />
      <WhyChooseUs />
    </div>
  );
}
