import { LEAD_PROJECTS } from '../config/leadProjects';
import { siteConfig } from '../config/siteConfig';
import { buildWhatsAppUrl } from './whatsapp';

export type PlotLeadPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  workType: string;
  projectId: string;
  plotSize: string;
  purchaseTimeline: string;
  siteVisit: string;
  submittedAt: string;
};

function projectLabel(projectId: string) {
  return LEAD_PROJECTS.find((p) => p.id === projectId)?.label ?? projectId;
}

function formatTimestamp(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-PK', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Karachi',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/** Pre-filled message for the visitor — they only tap Send in WhatsApp. */
export function buildVisitorPlotLeadMessage(lead: PlotLeadPayload): string {
  const name = `${lead.firstName.trim()} ${lead.lastName.trim()}`.trim();
  const project = projectLabel(lead.projectId);
  return [
    `Hello ${siteConfig.siteName},`,
    '',
    `I would like to inquire about ${project}.`,
    '',
    `Name: ${name}`,
    `Phone: ${lead.phone}`,
    `City: ${lead.city}`,
    `Work: ${lead.workType}`,
    `Project: ${project}`,
    `Plot Size: ${lead.plotSize}`,
    `Purchase Timeline: ${lead.purchaseTimeline}`,
    `Site Visit: ${lead.siteVisit}`,
    '',
    'Please share:',
    '• Latest prices',
    '• Payment plan',
    '• Plot availability',
    '• Site visit details',
    '',
    'Thank you.',
  ].join('\n');
}

/** Internal message for the sales team (optional — lead is also saved to MongoDB). */
export function buildCompanyPlotLeadMessage(lead: PlotLeadPayload): string {
  const name = `${lead.firstName.trim()} ${lead.lastName.trim()}`.trim();
  return [
    '🏡 NEW WEBSITE LEAD',
    '',
    'Name:',
    name,
    '',
    'Phone:',
    lead.phone,
    '',
    'City:',
    lead.city,
    '',
    'Work Type:',
    lead.workType,
    '',
    'Project:',
    projectLabel(lead.projectId),
    '',
    'Plot Size:',
    lead.plotSize,
    '',
    'Purchase Time:',
    lead.purchaseTimeline,
    '',
    'Site Visit:',
    lead.siteVisit,
    '',
    'Submitted From:',
    'Website',
    '',
    'Time:',
    formatTimestamp(lead.submittedAt),
  ].join('\n');
}

/** Opens WhatsApp with the visitor message already filled in. */
export function openVisitorPlotLeadWhatsApp(lead: PlotLeadPayload) {
  window.location.href = buildWhatsAppUrl(buildVisitorPlotLeadMessage(lead));
}
