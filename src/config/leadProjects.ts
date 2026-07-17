/** Real-estate projects offered in the plot lead funnel — add entries here. */
export const LEAD_PROJECTS = [
  {
    id: 'dha-margalla-orchard',
    label: 'DHA Margalla Orchard',
    detail: 'Park Road, Islamabad — DHA supervised society',
    badge: 'Featured',
  },
  {
    id: 'horizon-mall',
    label: 'Horizon Mall',
    detail: 'Mixed-use — H-13 Srinagar Highway, Islamabad',
    badge: 'New',
  },
] as const;

export type LeadProjectId = (typeof LEAD_PROJECTS)[number]['id'];

export const DEFAULT_LEAD_PROJECT_ID: LeadProjectId = 'dha-margalla-orchard';

export const WORK_TYPE_OPTIONS = ['Business', 'Private Job'] as const;

export type WorkType = (typeof WORK_TYPE_OPTIONS)[number];

export const PLOT_SIZE_OPTIONS = ['10 Marla', '1 Kanal'] as const;

export const PURCHASE_TIMELINE_OPTIONS = [
  'Immediately',
  'Within 1 Month',
  'Within 3 Months',
  'Just Exploring',
] as const;

export const SITE_VISIT_OPTIONS = ['Yes', 'Maybe Later'] as const;
