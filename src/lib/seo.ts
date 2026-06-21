import { Metadata } from "next";

const siteConfig = {
  name: "LuxMarble",
  title: "LuxMarble — Premium Indian Marble Showroom",
  description:
    "Discover exquisite Indian marble collections for flooring, wall cladding, countertops, and luxury interiors. Premium natural stone from India's finest quarries.",
  url: "https://luxmarble.com",
  ogImage: "/textures/white-marble.jpg",
};

export function createMetadata(
  title?: string,
  description?: string,
  path?: string
): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const url = path ? `${siteConfig.url}${path}` : siteConfig.url;

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageTitle,
    description: pageDescription,
    keywords: [
      "Indian marble",
      "premium marble",
      "marble flooring",
      "wall cladding marble",
      "countertop marble",
      "natural stone",
      "Makrana marble",
      "luxury marble",
    ],
    authors: [{ name: siteConfig.name }],
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: siteConfig.name,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [siteConfig.ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LuxMarble",
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/textures/white-marble.jpg`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9876543210",
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Marble Market, Kishangarh",
      addressLocality: "Rajasthan",
      postalCode: "305801",
      addressCountry: "IN",
    },
  };
}

export function productSchema(product: {
  name: string;
  description: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: { "@type": "Brand", name: "LuxMarble" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
    },
  };
}

export { siteConfig };
