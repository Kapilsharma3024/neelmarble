export interface MarbleShowcaseItem {
  id: string;
  slug: string;
  name: string;
  marbleImage: string;
  background: string;
  description: string;
  applications: string[];
  subtitle?: string;
}

/** v=4 — fixed calacatta living-room bug, all 12 images unique */
const V = "?v=4";

export const marbleShowcase: MarbleShowcaseItem[] = [
  {
    id: "1",
    slug: "white-onyx-marble",
    name: "White Onyx",
    marbleImage: `/marbles/white-onyx.jpg${V}`,
    background: `/backgrounds/hotel-white.jpg${V}`,
    subtitle: "Translucent White Marble",
    description:
      "Luxury white marble with soft grey veining. Installed as full-wall cladding in a premium marble bathroom.",
    applications: ["Flooring", "Wall Cladding", "Countertops", "Back-lit Panels"],
  },
  {
    id: "2",
    slug: "calacatta-gold-marble",
    name: "Calacatta Gold",
    marbleImage: `/marbles/calacatta-gold.jpg${V}`,
    background: `/backgrounds/hotel-gold.jpg${V}`,
    subtitle: "White Marble, Gold Veins",
    description:
      "White marble with warm golden-beige veining. Shown installed in a gold-trimmed luxury marble bathroom.",
    applications: ["Wall Cladding", "Vanities", "Feature Walls", "Flooring"],
  },
  {
    id: "3",
    slug: "black-marble",
    name: "Black Marble",
    marbleImage: `/marbles/black-marble.jpg${V}`,
    background: `/backgrounds/hotel-black.jpg${V}`,
    subtitle: "Deep Noir Elegance",
    description:
      "Premium black marble with white veining. Used across a dramatic dark marble bathroom and spa interior.",
    applications: ["Flooring", "Wall Cladding", "Bathroom Walls", "Elevator Cladding"],
  },
  {
    id: "4",
    slug: "pietra-beige-marble",
    name: "Pietra Greige",
    marbleImage: `/marbles/pietra-beige.jpg${V}`,
    background: `/backgrounds/hotel-beige.jpg${V}`,
    subtitle: "Warm Greige Stone",
    description:
      "Warm greige marble with natural veining. Featured as a full marble column in a luxury bedroom suite.",
    applications: ["Flooring", "Feature Columns", "Staircase", "Wall Cladding"],
  },
  {
    id: "5",
    slug: "green-marble",
    name: "Green Marble",
    marbleImage: `/marbles/green-marble.jpg${V}`,
    background: `/backgrounds/hotel-green.png${V}`,
    subtitle: "Forest Veined Stone",
    description:
      "Distinctive green malachite marble with organic veining. Perfect for spa retreats and boutique hotel bars.",
    applications: ["Bathroom Walls", "Spa Cladding", "Interior Panels", "Flooring"],
  },
  {
    id: "6",
    slug: "statuario-white-marble",
    name: "Statuario White",
    marbleImage: `/marbles/statuario.jpg${V}`,
    background: `/backgrounds/hotel-statuario.jpg${V}`,
    subtitle: "Sculptor's White Marble",
    description:
      "Bright white marble with bold grey veining. Featured as a marble fireplace wall in a refined living room.",
    applications: ["Flooring", "Fireplace", "Wall Cladding", "Columns"],
  },
];

export default marbleShowcase;
