import { motion } from 'framer-motion';
import {
  BedDoubleIcon,
  StoreIcon,
  CrownIcon,
  BriefcaseIcon,
  Maximize2Icon,
  SparklesIcon,
  type LucideIcon,
} from 'lucide-react';
import { HORIZON_MALL_PROMO, horizonMallUnits, horizonUnitPicker } from '../../data/horizonMallContent';
import { WhatsAppContactButton } from '../ui/WhatsAppContactButton';
import { whatsAppMessageForHorizonUnit } from '../../lib/whatsapp';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import type { HorizonMallUnit } from '../../data/horizonMallContent';

const UNIT_ICONS: Record<string, LucideIcon> = {
  office: BriefcaseIcon,
  'one-bed': BedDoubleIcon,
  'two-bed': BedDoubleIcon,
  'three-bed': BedDoubleIcon,
  shop: StoreIcon,
  penthouse: CrownIcon,
};

function badgeClass(badge?: string) {
  if (badge === 'Luxury') return 'bg-amber-500/90 text-black';
  if (badge === 'Popular') return 'bg-accent-green text-white';
  if (badge === 'Commercial' || badge === 'Retail') return 'bg-zinc-700 text-white';
  return 'bg-accent-green text-white';
}

function HorizonUnitCard({ unit, index }: { unit: HorizonMallUnit; index: number }) {
  const reduceMotion = usePrefersReducedMotion();
  const Icon = UNIT_ICONS[unit.id] ?? BedDoubleIcon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className="group flex h-full flex-col"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100/80 bg-white ring-1 ring-navy-100/40 transition-all duration-300 group-hover:border-accent-green-border group-hover:shadow-luxury-card-hover dark:border-navy-700 dark:bg-navy-900 dark:ring-navy-700/80">
        <div className="relative h-44 shrink-0 overflow-hidden sm:h-48">
          <img
            src={HORIZON_MALL_PROMO}
            alt={`Horizon Mall — ${unit.title}`}
            className="h-full w-full bg-navy-950 object-contain p-3 transition-transform duration-700 group-hover:scale-105 sm:p-4"
            loading="lazy"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md ${badgeClass(unit.badge)}`}
          >
            {unit.badge ?? 'Available'}
          </span>
          <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-navy-950/85 px-3 py-2 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-bold text-white sm:text-base">
                  {unit.title}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-zinc-400">{unit.category}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-navy-100 bg-cream/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-navy-600 dark:border-navy-600 dark:bg-navy-800/60 dark:text-zinc-300">
              <Maximize2Icon className="h-3 w-3" aria-hidden />
              {unit.sqft}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-navy-100 bg-cream/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-navy-600 dark:border-navy-600 dark:bg-navy-800/60 dark:text-zinc-300">
              <SparklesIcon className="h-3 w-3" aria-hidden />
              {unit.finish}
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-navy-600 dark:text-zinc-400">
            {unit.highlight}
          </p>

          <div className="mt-4 rounded-xl border border-accent-green-border/60 bg-accent-green-soft/50 p-3 dark:bg-accent-green-soft/30">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">
              Indicative price
            </p>
            <p className="mt-1 font-display text-xl font-bold text-navy-900 dark:text-cream">
              {unit.priceLabel}
            </p>
            {unit.priceNote && (
              <p className="mt-0.5 text-[11px] text-navy-600 dark:text-zinc-400">{unit.priceNote}</p>
            )}
          </div>

          <div className="mt-auto border-t border-navy-100 pt-4 dark:border-navy-700">
            <WhatsAppContactButton
              message={whatsAppMessageForHorizonUnit(unit.title)}
              label="I want to buy this"
              size="sm"
              variant="soft"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function HorizonMallUnitCards() {
  return (
    <div>
      <p className="mb-6 max-w-2xl text-sm leading-relaxed text-navy-600 dark:text-cream/75 sm:text-base">
        {horizonUnitPicker.subtitle}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {horizonMallUnits.map((unit, i) => (
          <HorizonUnitCard key={unit.id} unit={unit} index={i} />
        ))}
      </div>
    </div>
  );
}
