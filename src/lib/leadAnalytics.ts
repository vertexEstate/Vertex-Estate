export type LeadConversionPayload = {
  leadId?: string;
  projectId?: string;
  plotSize?: string;
  budget?: string;
  source?: string;
};

/**
 * Google Ads conversion + Meta Lead + hook for future server-side CAPI.
 * Set `VITE_GOOGLE_ADS_CONVERSION_SEND_TO` to `AW-XXXXX/label` for Ads tracking.
 */
export function trackPlotLeadConversion(payload: LeadConversionPayload = {}) {
  const source = payload.source ?? 'plot_lead_wizard';

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      event_category: 'lead',
      event_label: source,
      project: payload.projectId,
      plot_size: payload.plotSize,
      budget: payload.budget,
    });

    const sendTo = (import.meta.env.VITE_GOOGLE_ADS_CONVERSION_SEND_TO || '').trim();
    if (sendTo) {
      window.gtag('event', 'conversion', {
        send_to: sendTo,
        value: 1,
        currency: 'PKR',
      });
    }
  }

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', {
      content_name: payload.projectId,
      content_category: payload.plotSize,
      value: payload.budget,
      source,
    });
  }

  if (typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(
      new CustomEvent('vertex:plot-lead-submitted', {
        detail: { ...payload, source, at: new Date().toISOString() },
      })
    );
  }
}
