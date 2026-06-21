export interface MarbleProduct {
  id: string;
  name: string;
  category: "indian" | "flooring" | "wall-cladding" | "countertop" | "premium" | "onyx";
  subcategory: string;
  application: string[];
  texture: string;
  finish: string;
  dimensions: string;
  description: string;
  images: string[];
  featured?: boolean;
  interiorPreview?: string;
}

export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  message: string;
  createdAt: string;
  status: "new" | "read" | "replied";
}

export interface QuoteRequest {
  id: string;
  product: string;
  quantity: string;
  area: string;
  budget: string;
  timeline: string;
  designFile?: string;
  email: string;
  phone: string;
  createdAt: string;
  status: "new" | "processing" | "quoted";
}

export interface MarbleSection {
  id: string;
  title: string;
  subtitle: string;
  tagline: string[];
  description: string;
  slabImage: string;
  interiorImage: string;
  interiorLabel: string;
  applications: string[];
  finish: string;
  origin: string;
  color: string;
  bgColor: string;
  accentColor: string;
  textColor: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  beforeImage?: string;
  description: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface Statistic {
  value: string;
  label: string;
}
