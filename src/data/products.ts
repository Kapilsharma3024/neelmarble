import {
  MarbleProduct,
  GalleryProject,
  TimelineEvent,
  Statistic,
} from "@/types";
import { marbleSections } from "./collections";

export { marbleSections };

export const products: MarbleProduct[] = marbleSections.map((s) => ({
  id: s.id,
  name: s.title,
  category: "indian" as const,
  subcategory: s.subtitle,
  application: s.applications,
  texture: s.slabImage,
  finish: s.finish,
  dimensions: "120 × 240 cm",
  description: s.description,
  images: [s.slabImage, s.interiorImage],
  interiorPreview: s.interiorImage,
  featured: true,
}));

export const categories = [
  { id: "all", label: "All Collections" },
  { id: "indian", label: "Indian Marble" },
  { id: "flooring", label: "Flooring" },
  { id: "wall-cladding", label: "Wall Cladding" },
  { id: "countertop", label: "Countertops" },
  { id: "premium", label: "Premium Collection" },
];

export const applications = [
  "Flooring", "Wall Cladding", "Countertops", "Staircase",
  "Interior Panels", "Bathroom Walls", "Hotel Lobby", "Commercial",
  "Kitchen", "Spa", "Lobby", "Entrance",
];

export const subcategories = [
  "White Marble", "Black Marble", "Green Marble", "Beige Marble", "Brown Marble",
];

export const galleryProjects: GalleryProject[] = marbleSections.slice(0, 6).map((s, i) => ({
  id: String(i + 1),
  title: `${s.title} Installation`,
  location: "India",
  category: s.applications[0],
  image: s.interiorImage,
  beforeImage: s.slabImage,
  description: s.description,
}));

export const timelineEvents: TimelineEvent[] = [
  { year: "1998", title: "Foundation", description: "NeelMarble established in Rajasthan, sourcing directly from Makrana quarries." },
  { year: "2005", title: "National Expansion", description: "Expanded operations across India with state-of-the-art processing facilities." },
  { year: "2012", title: "Export Excellence", description: "Began exporting premium Indian marble to 25+ countries worldwide." },
  { year: "2018", title: "Sustainable Mining", description: "Implemented eco-friendly quarrying and zero-waste processing technology." },
  { year: "2024", title: "Digital Innovation", description: "Launched virtual showroom with 3000+ stone varieties." },
];

export const statistics: Statistic[] = [
  { value: "25+", label: "Years of Excellence" },
  { value: "500+", label: "Projects Completed" },
  { value: "3000+", label: "Stone Varieties" },
  { value: "25+", label: "Countries Served" },
];

export const projectTypes = [
  "Residential", "Commercial", "Hospitality", "Retail", "Institutional", "Other",
];
