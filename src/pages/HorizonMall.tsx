import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, InfoIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { WhatsAppInquiryCard } from '../components/contact/WhatsAppInquiryCard';
import { WhatsAppContactButton } from '../components/ui/WhatsAppContactButton';
import { whatsAppMessageForProject } from '../lib/whatsapp';
import {
  horizonHero,
  horizonOverview,
  horizonQuickHighlights,
  horizonConfiguration,
  horizonPropertyTypes,
  horizonAmenities,
  horizonAmenitiesNote,
  horizonNearbyLandmarks,
  horizonLocation,
  horizonInvestmentReasons,
  horizonCompliance,
  horizonFaq,
  horizonNavItems,
  HORIZON_MALL_PROMO,
  HORIZON_PROJECT_PATH,
  type HorizonSectionId,
} from '../data/horizonMallContent';
import { siteConfig } from '../config/siteConfig';
import { useTheme } from '../context/ThemeContext';
import { usePageSeo } from '../hooks/usePageSeo';

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-navy-100 dark:border-navy-600">
      <table className="w-full min-w-[280px] text-left text-xs sm:min-w-[32rem] sm:text-sm">
        <thead>
          <tr className="border-b border-navy-100 bg-navy-50 dark:border-navy-600 dark:bg-navy-900/80">
            {headers.map((h) => (
              <th
                key={h}
                className="px-3 py-2.5 font-bold uppercase tracking-wide text-navy-800 dark:text-gold-300 sm:px-4 sm:py-3"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-navy-100/80 last:border-0 dark:border-navy-700/80"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 text-navy-700 dark:text-cream/85 ${j === 0 ? 'font-semibold' : ''}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HorizonSection({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-header rounded-2xl border border-navy-100/90 bg-white p-4 text-navy-900 shadow-lg shadow-navy-900/5 dark:border-navy-600 dark:bg-navy-800 dark:text-cream dark:shadow-black/25 sm:scroll-mt-32 sm:rounded-[1.5rem] sm:p-8"
    >
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-700 dark:text-gold-300">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-display text-xl font-bold leading-tight text-navy-900 dark:text-cream sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-base leading-relaxed text-navy-700 dark:text-cream/80">{subtitle}</p>
      )}
      <div className="mt-6 text-navy-700 dark:text-cream/85">{children}</div>
    </motion.section>
  );
}

function FaqList() {
  return (
    <div className="space-y-3">
      {horizonFaq.map((item) => (
        <details
          key={item.q}
          className="group rounded-xl border border-navy-100 bg-cream/50 dark:border-navy-600 dark:bg-navy-900/40"
        >
          <summary className="cursor-pointer list-none px-4 py-3.5 text-sm font-bold text-navy-900 marker:content-none dark:text-cream sm:px-5 sm:text-base">
            {item.q}
          </summary>
          <p className="border-t border-navy-100 px-4 pb-4 pt-3 text-sm leading-relaxed text-navy-600 dark:border-navy-600 dark:text-cream/75 sm:px-5">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

export function HorizonMall() {
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<HorizonSectionId>('overview');

  usePageSeo({
    title: 'Horizon Mall Islamabad: H-13 mixed-use shops, offices & apartments | Vertex Estate',
    description: horizonHero.summary,
    path: HORIZON_PROJECT_PATH,
  });

  const scrollToSection = useCallback((id: HorizonSectionId) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const hash = location.hash.replace(/^#/, '') as HorizonSectionId;
    if (hash && horizonNavItems.some((n) => n.id === hash)) {
      const t = window.setTimeout(() => scrollToSection(hash), 80);
      return () => window.clearTimeout(t);
    }
  }, [location.hash, scrollToSection]);

  return (
    <div className="min-h-screen bg-cream pt-page pb-page text-navy-900 dark:bg-navy-950 dark:text-cream sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-2xl dark:border-navy-700 dark:bg-navy-900 sm:rounded-[2rem]">
          <div className="grid lg:grid-cols-2">
            <div className="order-2 flex flex-col justify-center p-5 sm:order-1 sm:p-10 lg:p-12">
              <span className="inline-flex w-fit rounded-full bg-accent-green px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Mixed-use · H-13
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.32em] text-gold-600 dark:text-gold-400">
                {siteConfig.siteName} project guide
              </p>
              <h1
                className={`mt-3 font-display text-2xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] ${
                  isDark ? 'text-gold-300' : 'text-navy-900'
                }`}
              >
                {horizonHero.title}
              </h1>
              <p className="mt-2 text-lg font-semibold leading-snug text-navy-700 dark:text-gold-300 sm:text-xl">
                {horizonHero.subtitle}
              </p>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-accent-green">
                {horizonHero.offerings}
              </p>
              <p className="mt-5 text-base leading-relaxed text-navy-600 dark:text-cream/80">
                {horizonHero.summary}
              </p>
              <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => scrollToSection('inquiry')}
                >
                  Inquire now
                  <ArrowRightIcon className="h-5 w-5" />
                </Button>
                <WhatsAppContactButton
                  size="lg"
                  variant="outline"
                  label="Chat on WhatsApp"
                  message={whatsAppMessageForProject('Horizon Mall')}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
            <div className="relative order-1 flex min-h-[240px] items-center justify-center bg-navy-950 p-6 sm:min-h-[280px] lg:order-2 lg:min-h-full lg:p-10">
              <img
                src={HORIZON_MALL_PROMO}
                alt={horizonHero.imageAlt}
                className="max-h-[min(420px,70vh)] w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="sticky top-[calc(4rem+env(safe-area-inset-top,0px))] z-30 -mx-4 mt-6 border-b border-navy-200/80 bg-cream/95 px-4 py-2.5 backdrop-blur-md dark:border-navy-700 dark:bg-navy-950/95 sm:top-[4.75rem]">
          <nav aria-label="Horizon Mall sections" className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
            {horizonNavItems.map((item) => {
              const active = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`shrink-0 rounded-full px-3.5 py-2.5 text-[11px] font-bold uppercase tracking-wide transition-colors sm:px-4 sm:text-xs ${
                    active
                      ? 'bg-accent-green text-white shadow-md shadow-accent-green/25'
                      : 'border border-navy-200 bg-white text-navy-800 dark:border-navy-600 dark:bg-navy-800 dark:text-cream'
                  }`}
                >
                  {item.shortLabel ?? item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-8 space-y-8">
          <HorizonSection
            id="overview"
            eyebrow={horizonOverview.eyebrow}
            title={horizonOverview.title}
          >
            {horizonOverview.paragraphs.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="mb-4 text-base leading-relaxed text-navy-600 last:mb-0 dark:text-cream/80"
              >
                {p}
              </p>
            ))}
          </HorizonSection>

          <HorizonSection id="highlights" title="Project highlights">
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {horizonQuickHighlights.map((item) => (
                <li
                  key={item.text}
                  className="flex gap-2.5 rounded-lg border border-navy-100/80 bg-cream/50 px-3 py-2.5 text-sm dark:border-navy-600 dark:bg-navy-900/40"
                >
                  <span className="shrink-0" aria-hidden>
                    {item.icon}
                  </span>
                  <span className="text-navy-800 dark:text-cream/90">{item.text}</span>
                </li>
              ))}
            </ul>
          </HorizonSection>

          <HorizonSection
            id="configuration"
            title={horizonConfiguration.title}
            subtitle={horizonConfiguration.subtitle}
          >
            <div className="grid gap-4 sm:grid-cols-3">
              {horizonConfiguration.levels.map((level) => (
                <div
                  key={level.label}
                  className="rounded-xl border border-navy-100 bg-cream/60 p-5 text-center dark:border-navy-600 dark:bg-navy-900/50"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-navy-500 dark:text-cream/55">
                    {level.label}
                  </p>
                  <p className="mt-2 font-display text-3xl font-bold text-gold-600 dark:text-gold-400">
                    {level.value}
                  </p>
                </div>
              ))}
            </div>
          </HorizonSection>

          <HorizonSection
            id="property-types"
            title={horizonPropertyTypes.title}
            subtitle={horizonPropertyTypes.subtitle}
          >
            <div className="grid gap-6 lg:grid-cols-3">
              {horizonPropertyTypes.categories.map((cat) => (
                <div
                  key={cat.title}
                  className="rounded-xl border border-navy-100 p-5 dark:border-navy-600"
                >
                  <h3 className="font-display text-lg font-bold text-navy-900 dark:text-cream">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs font-bold uppercase tracking-wide text-zinc-500">
                    {cat.intro}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-navy-600 dark:text-cream/75"
                      >
                        <span className="text-accent-green">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </HorizonSection>

          <HorizonSection id="amenities" title="Amenities">
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {horizonAmenities.map((a) => (
                <li
                  key={a}
                  className="flex gap-2 rounded-lg bg-navy-50/80 px-3 py-2 text-sm dark:bg-navy-900/40"
                >
                  <span className="text-accent-green">✓</span>
                  <span className="capitalize text-navy-800 dark:text-cream/85">{a}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm italic text-navy-600 dark:text-cream/65">
              {horizonAmenitiesNote}
            </p>
          </HorizonSection>

          <HorizonSection
            id="location"
            title={horizonLocation.title}
            subtitle={horizonLocation.subtitle}
          >
            <p className="mb-6 text-base leading-relaxed text-navy-600 dark:text-cream/80">
              {horizonLocation.description}
            </p>
            <DataTable
              headers={['Place', 'Approximate time']}
              rows={horizonNearbyLandmarks.map((l) => [l.place, l.time])}
            />
          </HorizonSection>

          <HorizonSection id="investment" title="Investment benefits">
            <div className="grid gap-4 sm:grid-cols-2">
              {horizonInvestmentReasons.map((r, i) => (
                <div
                  key={r.title}
                  className="flex gap-4 rounded-xl border border-navy-100 p-4 dark:border-navy-600"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-green-soft text-sm font-bold text-accent-green">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-navy-900 dark:text-cream">{r.title}</h3>
                    <p className="mt-1 text-sm text-navy-600 dark:text-cream/75">{r.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </HorizonSection>

          <HorizonSection
            id="compliance"
            eyebrow="Important"
            title={horizonCompliance.title}
            subtitle={horizonCompliance.subtitle}
          >
            <div className="mb-5 flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 dark:bg-amber-500/10">
              <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <p className="text-sm leading-relaxed text-navy-700 dark:text-cream/80">
                We do not list &quot;CDA Approved&quot; or &quot;NOC Approved&quot; unless official
                CDA documents are provided for public display. Ask us for approval details on
                WhatsApp.
              </p>
            </div>
            {horizonCompliance.paragraphs.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="mb-4 text-base leading-relaxed text-navy-600 last:mb-0 dark:text-cream/80"
              >
                {p}
              </p>
            ))}
            <div className="mt-4 flex flex-wrap gap-2">
              {horizonCompliance.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-navy-200 bg-cream px-3 py-1.5 text-xs font-bold text-navy-800 dark:border-navy-600 dark:bg-navy-900 dark:text-cream"
                >
                  {b}
                </span>
              ))}
            </div>
          </HorizonSection>

          <HorizonSection id="inquiry" title="Get rates on WhatsApp">
            <WhatsAppInquiryCard
              title="Ask about Horizon Mall units"
              subtitle="Shops, corporate offices, or apartments — tell us your budget and preferred size. We send available units and a clear quote."
            />
          </HorizonSection>

          <HorizonSection id="faq" eyebrow="FAQ" title="Frequently asked questions">
            <FaqList />
          </HorizonSection>
        </div>
      </div>

      <div className="mt-12 border-t border-navy-100 bg-white py-12 dark:border-navy-700 dark:bg-navy-900">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Ready to invest in Horizon Mall?</h2>
          <p className="mt-3 text-navy-600 dark:text-cream/75">
            Contact {siteConfig.siteName} for available units, site visits, and current pricing.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppContactButton
              size="lg"
              message={whatsAppMessageForProject('Horizon Mall')}
              label="Message on WhatsApp"
            />
            <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
              Contact us
            </Button>
          </div>
          <p className="mt-6">
            <Link
              to="/"
              className="text-sm font-semibold text-gold-600 hover:underline dark:text-gold-400"
            >
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
