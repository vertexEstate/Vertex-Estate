import { MARGALLA_GATE_PROMO, margallaPromoHighlights } from './margallaPromos';
import { MARGALLA_PROJECT_PATH } from '../data/margallaOrchardsContent';
import { HORIZON_MALL_PROMO, HORIZON_PROJECT_PATH } from '../data/horizonMallContent';

export type ProjectHighlight = {
  label: string;
  detail: string;
};

export type FeaturedProject = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  image: string;
  imageAlt: string;
  imageFit?: 'cover' | 'contain';
  badge: string;
  badgeVariant: 'featured' | 'new';
  highlights: readonly ProjectHighlight[];
  guidePath?: string;
  guideHash?: string;
  guideLabel?: string;
  whatsAppProjectName: string;
};

export const horizonMallHighlights = [
  { label: 'Srinagar Highway', detail: 'H-13 Islamabad frontage' },
  { label: 'Near NUST', detail: '~1 minute from university' },
  { label: 'Mixed-use', detail: 'Shops, offices & apartments' },
  { label: 'Airport access', detail: '~10 minutes to ISB airport' },
] as const;

/** Promo image for Horizon Mall building */
export { HORIZON_MALL_PROMO } from '../data/horizonMallContent';

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'dha-margalla-orchard',
    name: 'DHA Margalla Orchards',
    tagline: 'DHA Housing Society',
    description:
      'Park Road living with Margalla Hills views — a gated DHA society opposite COMSATS University. Residential plots from 10 Marla to 1 Kanal.',
    location: 'Islamabad, ICT',
    image: MARGALLA_GATE_PROMO,
    imageAlt: 'DHA Margalla Orchard, Park Road Islamabad — Vertex Estate',
    imageFit: 'cover',
    badge: 'Featured',
    badgeVariant: 'featured',
    highlights: margallaPromoHighlights,
    guidePath: MARGALLA_PROJECT_PATH,
    guideHash: 'overview',
    guideLabel: 'Explore project guide',
    whatsAppProjectName: 'DHA Margalla Orchards',
  },
  {
    id: 'horizon-mall',
    name: 'Horizon Mall',
    tagline: 'Mixed-use · H-13 Srinagar Highway',
    description:
      'Premium mixed-use on Main Srinagar Highway — luxury apartments, commercial shops, and corporate offices near NUST University.',
    location: 'H-13, Islamabad',
    image: HORIZON_MALL_PROMO,
    imageAlt: 'Horizon Mall — commercial and retail investment, Islamabad',
    imageFit: 'contain',
    badge: 'New',
    badgeVariant: 'new',
    highlights: horizonMallHighlights,
    guidePath: HORIZON_PROJECT_PATH,
    guideHash: 'overview',
    guideLabel: 'View project details',
    whatsAppProjectName: 'Horizon Mall',
  },
];
