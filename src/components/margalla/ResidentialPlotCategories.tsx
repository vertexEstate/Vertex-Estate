import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPinIcon, RulerIcon, ArrowRightIcon } from 'lucide-react';
import { VERTEX_BRAND_PROMO } from '../../config/margallaAssets';
import { margallaPlotCategories } from '../../data/margallaOrchardsContent';
import { MARGALLA_PROJECT_PATH } from '../../data/margallaOrchardsContent';
import { WhatsAppContactButton } from '../ui/WhatsAppContactButton';
import { whatsAppMessageForPlot } from '../../lib/whatsapp';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type PlotCategoryCardProps = {
  size: string;
  dimensionLabel: string;
  dimensions: string;
  plotSize: string;
  location: string;
};

function PlotCategoryCard({
  size,
  dimensionLabel,
  dimensions,
  plotSize,
  location,
}: PlotCategoryCardProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className="group h-full"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100/80 bg-white ring-1 ring-navy-100/40 transition-all duration-300 group-hover:border-accent-green-border group-hover:shadow-luxury-card-hover dark:border-navy-700 dark:bg-navy-900 dark:ring-navy-700/80">
        <Link
          to={`${MARGALLA_PROJECT_PATH}#plot-categories`}
          className="relative block shrink-0 overflow-hidden"
          aria-label={`${size} plots at DHA Margalla Orchard`}
        >
          <div className="relative h-52 sm:h-60">
            <img
              src={VERTEX_BRAND_PROMO}
              alt={`DHA Margalla Orchard — ${size}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full bg-navy-950 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />
            <span className="absolute left-4 top-4 z-20 rounded-full bg-accent-green px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-lg">
              Available
            </span>
            <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-navy-950/80 px-4 py-3 backdrop-blur-md">
              <p className="text-center font-display text-lg font-bold uppercase tracking-wide text-white sm:text-xl">
                {size}
              </p>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-14 z-20 flex translate-y-3 items-center justify-end px-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm">
                <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden />
              </span>
            </div>
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-center gap-1.5 text-navy-600 dark:text-zinc-400">
            <MapPinIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="text-sm">{location}</span>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-xl border border-navy-100/80 bg-cream/40 p-3.5 dark:border-navy-600 dark:bg-navy-800/40">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-green-soft text-accent-green">
              <RulerIcon className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                {dimensionLabel}
              </p>
              <p className="mt-1 font-display text-lg font-bold text-navy-900 dark:text-cream">
                {dimensions}
              </p>
            </div>
          </div>

          <div className="mt-auto border-t border-navy-100 pt-5 dark:border-navy-700">
            <WhatsAppContactButton
              message={whatsAppMessageForPlot(plotSize)}
              label="Ask on WhatsApp"
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

type Props = {
  showBlocks?: boolean;
  showIntro?: boolean;
  className?: string;
};

export function ResidentialPlotCategories({
  showBlocks = true,
  showIntro = true,
  className = '',
}: Props) {
  const { intro, categories, blocks } = margallaPlotCategories;

  return (
    <div className={className}>
      {showIntro && (
        <p className="mb-0 max-w-3xl text-base leading-relaxed text-navy-600 dark:text-cream/80">
          {intro}
        </p>
      )}

      <div
        className={`mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 sm:gap-8 ${showIntro ? 'mt-8' : 'mt-0'}`}
      >
        {categories.map((cat) => (
          <PlotCategoryCard key={cat.size} {...cat} />
        ))}
      </div>

      {showBlocks && (
        <div className="mt-14 sm:mt-16">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-green" aria-hidden />
              {blocks.eyebrow}
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold text-navy-900 dark:text-cream sm:text-3xl">
              {blocks.title}
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-navy-600 dark:text-zinc-400">
              {blocks.subtitle}
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-4 gap-2.5 sm:mt-10 sm:grid-cols-4 sm:gap-3">
            {blocks.letters.map((letter) => (
              <motion.div
                key={letter}
                whileHover={{ y: -3 }}
                className="group/block flex aspect-square flex-col items-center justify-center rounded-xl border border-navy-100 bg-white/90 shadow-sm transition-all hover:border-accent-green-border hover:bg-accent-green-soft hover:shadow-md dark:border-navy-700 dark:bg-navy-900/70 dark:hover:border-accent-green-border"
              >
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover/block:text-accent-green">
                  Block
                </span>
                <span className="mt-1 font-display text-2xl font-bold text-navy-900 dark:text-cream sm:text-3xl">
                  {letter}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
