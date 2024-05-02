import type { PortableTextBlock } from "@portabletext/types";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type DocumentBase = {
  _type: string;
};

export type PortfolioImagesDefinition = DocumentBase & {
  _type: "portfolioImages";
  fashion: SanityImageSource;
  realEstate: SanityImageSource;
  lifestyle: SanityImageSource;
  ventures: SanityImageSource;
  logistics: SanityImageSource;
  logisticsMobile?: SanityImageSource;
};

export type FashionPageDefinition = DocumentBase & {
  _type: "fashionPage";
  statsImage: SanityImageSource;
  stats: {
    title: string;
    subtitle: string;
  }[];
  copy: PortableTextBlock;
  galleryImages: SanityImageSource[];
};

export type HoldingsPageDefinition = DocumentBase & {
  _type: "holdingsPage";
  retail: SanityImageSource;
  commercial: SanityImageSource;
  residential: SanityImageSource;
  industrial: SanityImageSource;
};

export type HoldingsListPageDefinition = DocumentBase & {
  _type: "holdingsListPage";
  category: string;
  holdings: {
    name: string;
    image: SanityImageSource;
  }[];
};

export type RealtyPageDefinition = DocumentBase & {
  _type: "realtyPage";
  primaryImage: SanityImageSource;
  primaryImageMobile?: SanityImageSource;
  secondaryImage: SanityImageSource;
  services: {
    icon: SanityImageSource;
    label: string;
  }[];
  copy: PortableTextBlock;
};

export type LifestylePageDefinition = DocumentBase & {
  _type: "lifestylePage";
  primaryImage: SanityImageSource;
  gallery: {
    image1: SanityImageSource;
    image2?: SanityImageSource;
    image3?: SanityImageSource;
  }[];
};

export type VenturesPageDefinition = DocumentBase & {
  _type: "venturesPage";
  primaryImage: SanityImageSource;
  logos: SanityImageSource[];
};

export type LogisticsPageDefinition = DocumentBase & {
  _type: "logisticsPage";
  statsImage: SanityImageSource;
  stats: {
    title: string;
    subtitle: string;
  }[];
  copy: PortableTextBlock;
};

export type LoginBackgroundDefinition = DocumentBase & {
  _type: "loginBackground";
  image: SanityImageSource;
  mobileImage?: SanityImageSource;
};

export type ContactDefinition = DocumentBase & {
  _type: "contact";
  email: string;
  phone: string;
  address: PortableTextBlock;
};
