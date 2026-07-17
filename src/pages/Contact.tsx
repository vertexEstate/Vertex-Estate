import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  MessageSquareIcon,
  CalendarIcon,
  ArrowRightIcon,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { loadSiteContact } from '../lib/siteContactCache';
import { PlotLeadWizard } from '../components/contact/plotLead/PlotLeadWizard';
import type { SiteContactOffice, SiteQuickAction } from '../types/siteFiles';

type QuickActionRow = {
  icon: typeof MessageSquareIcon;
  label: string;
  value: string;
  href: string;
  color: string;
};

const defaultMapEmbed = siteConfig.mapEmbedUrl;

const defaultOffices: SiteContactOffice[] = [
  {
    city: 'Islamabad, F-7 Markaz',
    address:
      '2nd Floor, Chaudhry Plaza, up to Subway near Mr Chips, F-7 Markaz, Islamabad',
    phone: '+92 310 9882888',
    email: 'contact@vertexestate.com',
  },
];

const defaultQuickActions: QuickActionRow[] = [
  {
    icon: MessageSquareIcon,
    label: 'WhatsApp',
    value: '+92 310-9882888',
    href: 'https://wa.me/923109882888',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: MailIcon,
    label: 'Email',
    value: 'contact@vertexestate.com',
    href: 'mailto:contact@vertexestate.com',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: PhoneIcon,
    label: 'Call us',
    value: '+92 310-9882888',
    href: 'tel:+923109882888',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: CalendarIcon,
    label: 'Visit us',
    value: 'F-7 Markaz, Islamabad',
    href: siteConfig.vertexOfficeMapsOpenUrl,
    color: 'from-gold-500 to-gold-600',
  },
];

const iconByKey: Record<
  NonNullable<SiteQuickAction['icon']>,
  typeof MessageSquareIcon
> = {
  message: MessageSquareIcon,
  mail: MailIcon,
  phone: PhoneIcon,
  calendar: CalendarIcon,
};

function quickActionsFromFile(raw: SiteQuickAction[]): QuickActionRow[] {
  return raw.map((a) => ({
    icon: (a.icon && iconByKey[a.icon]) || MailIcon,
    label: a.label,
    value: a.value,
    href: a.href,
    color: a.color || 'from-gold-500 to-gold-600',
  }));
}

export function Contact() {
  const [wizardOpen, setWizardOpen] = useState(true);
  const [resolved, setResolved] = useState({
    offices: defaultOffices,
    quickActions: defaultQuickActions,
    mapSrc: siteConfig.mapEmbedUrl || defaultMapEmbed,
  });

  useEffect(() => {
    loadSiteContact().then((c) => {
      if (!c) return;
      setResolved({
        offices: c.offices?.length ? c.offices : defaultOffices,
        quickActions: c.quickActions?.length
          ? quickActionsFromFile(c.quickActions)
          : defaultQuickActions,
        mapSrc:
          (c.mapEmbedUrl && c.mapEmbedUrl.trim()) ||
          siteConfig.mapEmbedUrl ||
          defaultMapEmbed,
      });
    });
  }, []);

  const { offices, quickActions, mapSrc } = resolved;

  return (
    <div className="min-h-screen bg-cream pt-page pb-page dark:bg-navy-900">
      <PlotLeadWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-navy-900 dark:text-cream mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-navy-600 dark:text-navy-400 max-w-2xl mx-auto">
            Tell us what you&apos;re looking for — or reach us directly below.
          </p>
        </motion.div>

        {!wizardOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setWizardOpen(true)}
            className="mx-auto mb-12 flex w-full max-w-xl flex-col items-center gap-3 rounded-[1.75rem] border border-gold-500/30 bg-gradient-to-br from-white to-cream/90 p-8 text-center shadow-xl transition hover:border-gold-500/50 hover:shadow-gold-glow dark:from-navy-800 dark:to-navy-900 dark:border-gold-500/25"
          >
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-gold-600 dark:text-gold-400">
              Plot inquiry
            </span>
            <span className="font-display text-2xl font-bold text-navy-900 dark:text-cream">
              Find your perfect plot
            </span>
            <span className="text-sm text-navy-600 dark:text-cream/70">
              9 quick questions · WhatsApp follow-up · Free site visit
            </span>
            <span className="mt-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-gold-300 via-gold-500 to-gold-600 px-6 py-3 text-sm font-bold text-navy-900 shadow-btn-primary">
              Start now
              <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </span>
          </motion.button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quickActions.map((action, index) => (
            <motion.a
              key={`${action.label}-${action.href}`}
              href={action.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="block"
            >
              <div
                className={`bg-gradient-to-br ${action.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all`}
              >
                <action.icon className="w-8 h-8 mb-4" />
                <h3 className="text-lg font-bold mb-1">{action.label}</h3>
                <p className="text-sm opacity-90">{action.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-xl h-96 lg:h-auto lg:min-h-[420px]"
          >
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '24rem' }}
              allowFullScreen
              loading="lazy"
              title="Office Location"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-xl"
          >
            <h3 className="text-xl font-display font-bold text-navy-900 dark:text-cream mb-6">
              Office Locations
            </h3>
            <div className="space-y-6">
              {offices.map((office, index) => (
                <div
                  key={`${office.city}-${index}`}
                  className="pb-6 border-b border-navy-200 dark:border-navy-700 last:border-0 last:pb-0"
                >
                  <h4 className="text-lg font-bold text-navy-900 dark:text-cream mb-3">
                    {office.city}
                  </h4>
                  <div className="space-y-2 text-navy-600 dark:text-navy-400">
                    <div className="flex items-start gap-2">
                      <MapPinIcon className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-5 h-5 text-gold-500" />
                      <a
                        href={`tel:${office.phone.replace(/\s/g, '')}`}
                        className="hover:text-gold-500 transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MailIcon className="w-5 h-5 text-gold-500" />
                      <a
                        href={`mailto:${office.email}`}
                        className="hover:text-gold-500 transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
