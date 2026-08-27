export interface TierPrice {
  guests: string;
  price: string;
}

export interface PackageItem {
  id: string;
  name: string;
  treatmentsCount: string;
  pricing: TierPrice[];
  popular?: boolean;
  borderClass: string;
  tagColor?: string;
  icon: string;
  features: string[];
}

export interface TreatmentCategory {
  title: string;
  icon: string;
  items: string[];
}

export interface TestimonialItem {
  id: string;
  initials: string;
  package: string;
  rating: number;
  text: string;
  badge?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  category: 'all' | 'makeup' | 'hair' | 'nails' | 'bus';
  caption: string;
}

export interface SiteContent {
  phone: string;
  instagram: string;
  email: string;
  depositText: string;
  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    subtitle: string;
    description: string;
    videoUrl: string;
  };
  packages: {
    scriptTitle: string;
    mainTitle: string;
    subtitle: string;
    items: PackageItem[];
    partyIncludes: string[];
    treatmentCategories: TreatmentCategory[];
    extraTreatments13Plus: string[];
  };
  coverage: {
    title: string;
    subtitle: string;
    areas: string[];
    radiusInfo: string;
    mapImage: string;
  };
  testimonials: {
    scriptTitle: string;
    mainTitle: string;
    items: TestimonialItem[];
  };
  gallery: {
    scriptTitle: string;
    mainTitle: string;
    subtitle: string;
    items: GalleryItem[];
  };
}
