export interface Destination {
  id: string;
  name: string;
  significance: string;
  facts: string;
  altitude: string;
  image: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  highlights: string[];
  image?: string;
}

export interface PricePlan {
  type: string;
  price: string;
  description: string;
  recommended?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}
