/** Horizon Mall — structured project information (H-13, Srinagar Highway) */

export const HORIZON_PROJECT_PATH = '/horizon-mall';

export const HORIZON_MALL_PROMO = '/brand/horizon-mall-promo.png';

export const HORIZON_MALL_PAYMENT_PLAN = '/brand/horizon-mall-payment-plan.png';

export type HorizonSectionId =
  | 'overview'
  | 'highlights'
  | 'configuration'
  | 'property-types'
  | 'payment-plan'
  | 'amenities'
  | 'location'
  | 'investment'
  | 'compliance'
  | 'faq';

export type HorizonNavItem = {
  id: HorizonSectionId;
  label: string;
  shortLabel?: string;
};

export const horizonNavItems: HorizonNavItem[] = [
  { id: 'overview', label: 'About', shortLabel: 'About' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'configuration', label: 'Configuration', shortLabel: 'Floors' },
  { id: 'property-types', label: 'Property types', shortLabel: 'Units' },
  { id: 'payment-plan', label: 'Payment plan', shortLabel: 'Payment' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'location', label: 'Nearby', shortLabel: 'Nearby' },
  { id: 'investment', label: 'Why Invest' },
  { id: 'compliance', label: 'Regulatory', shortLabel: 'Regulatory' },
  { id: 'faq', label: 'FAQ' },
];

export const horizonHero = {
  title: 'Horizon Mall Islamabad',
  subtitle: 'Premium mixed-use development on Main Srinagar Highway, H-13, Islamabad',
  offerings: 'Luxury Apartments • Commercial Shops • Corporate Offices',
  summary:
    'Horizon Mall is a mixed-use commercial and residential development on Main Srinagar Highway (H-13), Islamabad — near NUST University and the Aramco/GO petrol station. Shopping, business, and modern living in one destination.',
  imageAlt: 'Horizon Mall — mixed-use development, H-13 Islamabad',
};

export const horizonOverview = {
  eyebrow: 'Overview',
  title: 'Mixed-use living and business on Srinagar Highway',
  paragraphs: [
    'Horizon Mall is a mixed-use commercial and residential development located on Main Srinagar Highway (H-13), Islamabad, near NUST University and the Aramco/GO petrol station. The project is designed to combine shopping, business, and modern living in one destination.',
    'Vertex Estate helps buyers and investors with unit selection, floor plans, payment terms, and site visits. Message us on WhatsApp for current availability and pricing.',
  ],
};

/** Quick bullet highlights with emoji icons */
export const horizonQuickHighlights = [
  { icon: '📍', text: 'Main Srinagar Highway, H-13 Islamabad' },
  { icon: '🎓', text: '1 minute from NUST University' },
  { icon: '🚇', text: 'Close to Metro Station' },
  { icon: '✈️', text: 'Approximately 10 minutes from Islamabad International Airport' },
  { icon: '🏢', text: 'Mixed-use development' },
  { icon: '🛍️', text: 'Commercial shops' },
  { icon: '🏢', text: 'Corporate offices' },
  { icon: '🏠', text: 'Luxury apartments' },
  { icon: '🚗', text: 'Underground parking' },
  { icon: '🛗', text: 'High-speed elevators' },
  { icon: '🔒', text: '24/7 security' },
  { icon: '🎥', text: 'CCTV surveillance' },
  { icon: '⚡', text: 'Backup power' },
  { icon: '🌿', text: 'Modern architecture' },
] as const;

export const horizonConfiguration = {
  title: 'Project configuration',
  subtitle: 'According to publicly available listings',
  levels: [
    { label: 'Basement levels', value: '2' },
    { label: 'Ground floor', value: '1' },
    { label: 'Upper floors', value: '14' },
  ],
};

export const horizonPropertyTypes = {
  title: 'Property types',
  subtitle: 'Commercial, corporate, and residential categories',
  categories: [
    {
      title: 'Commercial shops',
      intro: 'Suitable for:',
      items: [
        'Retail brands',
        'Clothing stores',
        'Electronics',
        'Restaurants',
        'Cafés',
        'Pharmacy',
        'Salon',
        'Boutique',
      ],
    },
    {
      title: 'Corporate offices',
      intro: 'Designed for:',
      items: [
        'Software houses',
        'Real estate companies',
        'IT firms',
        'Consultants',
        'Medical clinics',
        'Corporate headquarters',
      ],
    },
    {
      title: 'Luxury apartments',
      intro: 'Available categories:',
      items: [
        'Studio apartment',
        '1 bedroom apartment',
        '2 bedroom apartment',
        '3 bedroom apartment',
        'Penthouses',
      ],
    },
  ],
};

export type HorizonMallUnit = {
  id: string;
  title: string;
  category: string;
  sqft: string;
  finish: string;
  priceLabel: string;
  priceNote?: string;
  highlight: string;
  badge?: string;
};

export const horizonMallUnits: HorizonMallUnit[] = [
  {
    id: 'office',
    title: 'Office',
    category: 'Corporate',
    sqft: '300 sqft',
    finish: 'Commercial office space',
    priceLabel: 'PKR 75 Lac',
    priceNote: 'From payment plan · 25,000 per sqft',
    highlight: 'Ideal for IT firms, consultants & corporate HQ',
    badge: 'Commercial',
  },
  {
    id: 'one-bed',
    title: 'One Bed Apartment',
    category: 'Residential',
    sqft: '484 sqft',
    finish: 'Fully furnished',
    priceLabel: 'PKR 96.8 Lac',
    priceNote: 'From payment plan · 20,000 per sqft',
    highlight: 'Compact luxury living near NUST & metro',
    badge: 'Popular',
  },
  {
    id: 'two-bed',
    title: 'Two Bed Apartment',
    category: 'Residential',
    sqft: '1,055 sqft',
    finish: 'Fully finished',
    priceLabel: 'PKR 2.11 Crore',
    priceNote: 'From payment plan · 20,000 per sqft',
    highlight: 'Family-sized layout with modern finishes',
    badge: 'Family',
  },
  {
    id: 'three-bed',
    title: 'Three Bed Apartment',
    category: 'Residential',
    sqft: '1,520 sqft',
    finish: 'Fully finished',
    priceLabel: 'PKR 3.04 Crore',
    priceNote: 'From payment plan · 20,000 per sqft',
    highlight: 'Spacious apartments for premium family living',
  },
  {
    id: 'shop',
    title: 'Commercial Shop',
    category: 'Retail',
    sqft: 'Ground floor outlets',
    finish: 'High-visibility retail frontage',
    priceLabel: 'On request',
    priceNote: 'From 100,000 per sqft · see payment plan',
    highlight: 'Retail brands, restaurants, pharmacy & boutique',
    badge: 'Retail',
  },
  {
    id: 'penthouse',
    title: 'Penthouse',
    category: 'Luxury',
    sqft: '3,147 sqft',
    finish: 'Premium top-floor residence',
    priceLabel: 'PKR 9.44 Crore',
    priceNote: 'From payment plan · 30,000 per sqft',
    highlight: 'Statement penthouse with panoramic views',
    badge: 'Luxury',
  },
];

export const horizonUnitPicker = {
  title: 'Choose what you want to buy',
  subtitle:
    'Offices, shops, and luxury apartments at Horizon Mall — tap a unit to inquire on WhatsApp with payment plan details.',
};

export const horizonPaymentPlan = {
  title: 'Payment plan',
  subtitle: 'Horizon Mall — The Luxury Living · Vertex Estate',
  imageAlt: 'Horizon Mall official payment plan — offices, apartments, penthouses, and ground floor outlets',
  notes: [
    'Payment should be made through Cash, PO, DD, or cross cheque in favor of Horizon Mall or Unique Property Advisor.',
    '10% discount on lump-sum payment.',
    'Prices are subject to change without prior notice.',
  ],
};

export const horizonAmenities = [
  'Grand entrance lobby',
  'Reception',
  'High-speed lifts',
  'Underground parking',
  '24/7 security',
  'CCTV monitoring',
  'Fire fighting system',
  'Backup generators',
  'Gym',
  'Health & fitness club',
  'Cafés',
  'Shopping mall',
  'Family environment',
] as const;

export const horizonAmenitiesNote =
  'Some listings also mention plans for a major supermarket or hypermarket.';

export const horizonNearbyLandmarks = [
  { place: 'NUST University', time: '1 minute' },
  { place: 'Metro Station', time: '1 minute' },
  { place: 'Islamabad International Airport', time: '10 minutes' },
  { place: 'Motorway M-1', time: '8 minutes' },
  { place: 'Saddar Rawalpindi', time: '15 minutes' },
  { place: 'Islamabad City Center', time: '15 minutes' },
] as const;

export const horizonLocation = {
  title: 'Nearby locations',
  subtitle: 'Prime connectivity from H-13, Srinagar Highway',
  description:
    'Horizon Mall sits on Main Srinagar Highway (H-13) with quick access to NUST, the metro, the airport, and Islamabad\'s main commercial corridors.',
};

export const horizonInvestmentReasons = [
  {
    title: 'Prime highway front location',
    body: 'Main Srinagar Highway frontage in H-13 puts the project in daily view of through-traffic and commuters.',
  },
  {
    title: 'High rental potential',
    body: 'Shops, offices, and apartments in mixed-use towers attract tenants seeking visibility and convenience.',
  },
  {
    title: 'Growing commercial zone',
    body: 'H-13 continues to develop as a corridor linking university, metro, and airport access.',
  },
  {
    title: 'Student & corporate catchment',
    body: 'NUST proximity and office demand support retail, dining, and service businesses.',
  },
  {
    title: 'Easy airport access',
    body: 'Islamabad International Airport is approximately 10 minutes away — useful for business tenants and residents.',
  },
  {
    title: 'Flexible payment plans',
    body: 'Ask Vertex Estate for current installment options and booking terms on available units.',
  },
  {
    title: 'Long-term capital appreciation',
    body: 'Mixed-use assets on major Islamabad arteries tend to benefit from sustained urban growth.',
  },
];

/** No unverified CDA/NOC claims — factual regulatory note only */
export const horizonCompliance = {
  title: 'Location & regulatory information',
  subtitle: 'Approval details available upon request',
  paragraphs: [
    'Horizon Mall is located in H-13, Islamabad, on Main Srinagar Highway. The project is presented as developed under applicable local regulations.',
    'We do not publish specific CDA NOC or Layout Plan (LOP) approval numbers on this website unless official documents are provided by the developer for public display.',
    'For verification of approvals, building permissions, or compliance documents, contact Vertex Estate on WhatsApp and we will share what the developer has made available.',
  ],
  badges: [
    'Located in H-13 Islamabad',
    'Main Srinagar Highway frontage',
    'Approval details on request',
  ],
};

export const horizonFaq = [
  {
    q: 'Where is Horizon Mall located?',
    a: 'On Main Srinagar Highway, H-13, Islamabad — near NUST University and the Aramco/GO petrol station.',
  },
  {
    q: 'What property types are available?',
    a: 'Commercial shops, corporate offices, and luxury apartments including studios through penthouses. Availability changes — contact us for the latest list.',
  },
  {
    q: 'How many floors does the project have?',
    a: 'According to publicly available listings: 2 basement levels, ground floor, and 14 upper floors.',
  },
  {
    q: 'Is Horizon Mall CDA approved?',
    a: 'We do not state CDA or NOC approval on this website without official documents. Horizon Mall is located in H-13 Islamabad. For approval and compliance details, message Vertex Estate and we will share what the developer provides.',
  },
  {
    q: 'How do I get current rates?',
    a: 'WhatsApp Vertex Estate with your preferred unit type (shop, office, or apartment). We reply with floor-wise availability and today\'s pricing.',
  },
  {
    q: 'What amenities are included?',
    a: 'Grand lobby, lifts, underground parking, 24/7 security, CCTV, backup power, gym, fitness club, cafés, and a shopping mall environment. Some listings mention a planned hypermarket.',
  },
  {
    q: 'Can I visit before buying?',
    a: 'Yes. Book a site visit with our team and we will show you the project location and discuss available units.',
  },
];

export const horizonMallOverview = {
  eyebrow: 'Second project',
  title: 'Horizon Mall Islamabad',
  tagline: 'H-13 · Srinagar Highway',
  intro:
    'Premium mixed-use development on Main Srinagar Highway (H-13) — luxury apartments, commercial shops, and corporate offices near NUST University.',
  stats: [
    { label: 'Location', value: 'H-13, Srinagar Highway' },
    { label: 'Project type', value: 'Mixed-use' },
    { label: 'Upper floors', value: '14 + Ground' },
    { label: 'Near NUST', value: '~1 minute' },
    { label: 'To airport', value: '~10 minutes' },
  ],
};
