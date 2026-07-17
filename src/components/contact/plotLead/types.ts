export type PlotLeadFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  workType: string;
  projectId: string;
  plotSize: string;
  purchaseTimeline: string;
  siteVisit: string;
};

export const INITIAL_PLOT_LEAD: PlotLeadFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  city: '',
  workType: '',
  projectId: 'dha-margalla-orchard',
  plotSize: '',
  purchaseTimeline: '',
  siteVisit: '',
};

export type WizardPhase = 'questions' | 'review' | 'submitting';

export const QUESTION_STEP_COUNT = 9;
