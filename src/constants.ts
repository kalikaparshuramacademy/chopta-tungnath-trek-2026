import { Destination, DayItinerary, PricePlan, FAQItem } from './types';

export const TRIP_NAME = "Chopta Tungnath Trek 2026";
export const TRIP_DATES = "21st June to 25th June";
export const DURATION = "4 Nights / 5 Days";
export const TAGLINE = "Walk Through Clouds. Climb Beyond Fear. Experience Tungnath.";
export const CONTACT_PHONE = "9266910290";
export const OFFICIAL_ADDRESS = "H.no 18, KH No. 62/18, Block D-1, 1st Floor, Phase 1, Budh Vihar, North West Delhi, Delhi, India - 110086";
export const PAYMENT_LINK = "https://rzp.io/l/chopta-june-2026"; // Actual Razorpay link can be updated here

export const DESTINATIONS: Destination[] = [
  {
    id: "rishikesh",
    name: "Rishikesh",
    significance: "Sacred river energy",
    facts: "Gateway to the Garhwal Himalayas",
    altitude: "340m",
    image: "/images/dest_rishikesh_1778044611078.webp"
  },
  {
    id: "devprayag",
    name: "Devprayag",
    significance: "Confluence of rivers",
    facts: "Where Bhagirathi meets Alaknanda to become Ganga",
    altitude: "830m",
    image: "/images/dest_devprayag_1778044625556.webp"
  },
  {
    id: "deoriatal",
    name: "Deoria Tal",
    significance: "Mirror lake reflections",
    facts: "Crystal-clear water with Chaukhamba peaks reflection",
    altitude: "2,438m",
    image: "/images/day2_deoria_tal_1778044472269.webp"
  },
  {
    id: "chopta",
    name: "Chopta",
    significance: "Mini Switzerland atmosphere",
    facts: "Lush green meadows and dense forests",
    altitude: "2,680m",
    image: "/images/dest_chopta_1778044654935.webp"
  },
  {
    id: "tungnath",
    name: "Tungnath Temple",
    significance: "Highest Shiva temple experience",
    facts: "Lord Shiva's hands appeared here after Mahabharat",
    altitude: "3,680m",
    image: "/images/day3_tungnath_1778044489559.webp"
  },
  {
    id: "chandrashila",
    name: "Chandrashila",
    significance: "360° Himalayan summit panorama",
    facts: "Panoramic views of Nanda Devi, Trishul, and Chaukhamba",
    altitude: "4,000m",
    image: "/images/dest_chandrashila_1778044684173.webp"
  }
];

export const ITINERARY: DayItinerary[] = [
  {
    day: 1,
    title: "Departure + Overnight Journey",
    description: "Depart from Delhi in the evening and begin your exciting journey toward the Himalayas.",
    highlights: ["Departure from Delhi", "Group road trip experience", "Overnight journey", "Scenic Himalayan route"],
    image: "/images/day1_departure_1778044457321.webp"
  },
  {
    day: 2,
    title: "Scenic Drive + Deoria Tal Trek",
    description: "Arrive in Rishikesh, drive towards Sari Village, and trek to the beautiful Deoria Tal lake.",
    highlights: ["Devprayag Sangam viewpoint", "2.5 km trek to Deoria Tal", "Lake reflection views", "Overnight stay in Sari Village"],
    image: "/images/day2_deoria_tal_1778044472269.webp"
  },
  {
    day: 3,
    title: "Tungnath Temple + Chandrashila Summit",
    description: "The marquee day. Begin the trek to the highest Shiva temple and explore Chandrashila peak.",
    highlights: ["3.5 km Himalayan trek", "Highest Shiva Temple in the world", "360° panoramic summit views", "Descent back to Chopta"],
    image: "/images/day3_tungnath_1778044489559.webp"
  },
  {
    day: 4,
    title: "Mountain Retreat + Return Drive",
    description: "Wake up to fresh mountain air, visit local temples, and begin the journey back towards Rishikesh.",
    highlights: ["Morning views of Chopta valley", "Dhari Devi Temple visit", "Scenic road journey", "Overnight drive to Delhi"],
    image: "/images/day4_return_1778044507903.webp"
  },
  {
    day: 5,
    title: "Arrival in Delhi",
    description: "Early morning arrival in Delhi, marking the end of an incredible journey.",
    highlights: ["Completion of journey", "Memorable Himalayan experience", "New friends", "Trip conclusions"],
    image: "/images/day5_arrival_1778044527261.webp"
  }
];

export const PRICING_PLANS: PricePlan[] = [
  {
    type: "Quad Sharing",
    price: "₹5,499",
    description: "Best option for groups and budget travelers."
  },
  {
    type: "Triple Sharing",
    price: "₹5,999",
    description: "Ideal for small friend groups.",
    recommended: true
  },
  {
    type: "Double Sharing",
    price: "₹6,499",
    description: "Perfect for couples or those wanting extra comfort."
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Is this trek beginner friendly?",
    answer: "Yes, the Chopta Tungnath trek is considered easy to moderate and is perfect for first-timers."
  },
  {
    question: "Is Tungnath safe in June?",
    answer: "June is one of the best times to visit with clear skies and pleasant weather."
  },
  {
    question: "Are meals included?",
    answer: "Yes, standard breakfast and dinner are included as per the itinerary."
  },
  {
    question: "What should I pack?",
    answer: "Warm clothes, trekking shoes, rain protection, and personal essentials are recommended."
  },
  {
    question: "Is it suitable for solo travelers?",
    answer: "Absolutely! Most of our travelers are solo students looking to make new friends."
  }
];

export const INCLUSIONS = [
  "Comfortable Stay (Hotels/Camps)",
  "Experienced Driver & Transport",
  "Delicious Breakfast & Dinner",
  "Sightseeing as per Itinerary",
  "Professional Trek Leader/Guide",
  "First-aid Support & Oximeter"
];

export const EXCLUSIONS = [
  "Personal Expenses (Laundry, Phone)",
  "Meals during transit",
  "Travel Insurance",
  "Pony / Mule Charges",
  "Entry fees & Additional Activities"
];
