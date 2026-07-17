import { siteConfig } from '../config/siteConfig';

export function getWhatsAppPhoneDigits() {
  return siteConfig.whatsappPhone.replace(/\D/g, '');
}

export function buildWhatsAppUrl(message?: string) {
  const phone = getWhatsAppPhoneDigits();
  const text = encodeURIComponent(message ?? siteConfig.whatsappDefaultMessage);
  return `https://wa.me/${phone}?text=${text}`;
}

export function whatsAppMessageForPlot(plotSize?: string) {
  const size = plotSize?.trim();
  if (!size) return siteConfig.whatsappDefaultMessage;
  return `Hi ${siteConfig.siteName}! I am interested in a ${size} plot at DHA Margalla Orchards. Please share current availability and rates.`;
}

export function whatsAppMessageForProperty(title?: string) {
  if (!title?.trim()) return siteConfig.whatsappDefaultMessage;
  return `Hi ${siteConfig.siteName}! I saw "${title}" on your website and would like more details.`;
}

export function whatsAppMessageForProject(projectName: string) {
  const name = projectName.trim();
  if (!name) return siteConfig.whatsappDefaultMessage;
  return `Hi ${siteConfig.siteName}! I am interested in ${name}. Please share current availability and rates.`;
}

export function whatsAppMessageForHorizonUnit(unitLabel: string) {
  const label = unitLabel.trim();
  if (!label) return whatsAppMessageForProject('Horizon Mall');
  return `Hi ${siteConfig.siteName}! I want to buy a ${label} at Horizon Mall Islamabad (H-13). Please share availability, payment plan, and current rates.`;
}
