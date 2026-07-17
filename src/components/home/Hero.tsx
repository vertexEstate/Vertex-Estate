import { motion } from 'framer-motion';
import { ArrowRightIcon, ChevronDownIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MARGALLA_PROJECT_PATH, margallaHero } from '../../data/margallaOrchardsContent';
import { Button } from '../ui/Button';
import { WhatsAppContactButton } from '../ui/WhatsAppContactButton';
import { useSiteContent } from '../../context/SiteContentContext';
import { siteConfig } from '../../config/siteConfig';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { AnimatedCounter } from '../ui/AnimatedCounter';

const TRUST_STATS = [
  { value: 15, suffix: '+', label: 'Years experience' },
  { value: 2500, suffix: '+', label: 'Happy clients' },
  { value: 48, suffix: '+', label: 'Projects delivered' },
  { value: 4.9, suffix: '', label: 'Google rating', decimal: true },
] as const;

export function Hero() {
  const navigate = useNavigate();
  const reduceMotion = usePrefersReducedMotion();
  const { heroSubheading } = useSiteContent();

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] scroll-mt-header flex-col items-center justify-center overflow-hidden bg-black px-4 text-center text-white sm:px-6"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center pt-24 pb-16 sm:pt-28">
        {/* DiyWeb-style pill badge */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-gradient-to-b from-zinc-700/40 to-zinc-900/40 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-300 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
          </span>
          DHA Verified · Premium Real Estate
        </motion.div>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[2.25rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4rem]"
        >
          {margallaHero.title}
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.14 }}
          className="mt-4 font-display text-xl font-medium text-zinc-300 sm:text-2xl md:text-3xl"
        >
          {margallaHero.subtitle}
        </motion.p>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-zinc-500 sm:text-lg"
        >
          {heroSubheading}
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="mt-10 flex w-full max-w-lg flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:justify-center"
        >
          <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
            Book a site visit
            <ArrowRightIcon className="h-4 w-4" aria-hidden />
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate(MARGALLA_PROJECT_PATH)}>
            Explore project
          </Button>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="mt-4"
        >
          <WhatsAppContactButton
            size="md"
            variant="solid"
            label={`WhatsApp ${siteConfig.siteName}`}
            className="rounded-full"
          />
        </motion.div>

        {/* Stats row — minimal gray boxes */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.38 }}
          className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-4"
        >
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="bg-black px-4 py-5">
              <div className="font-display text-2xl font-semibold tabular-nums text-white sm:text-3xl">
                {stat.decimal ? (
                  <>
                    <AnimatedCounter end={4} suffix="" />.9
                  </>
                ) : (
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500 sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {!reduceMotion && (
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() =>
            document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' })
          }
          className="relative z-10 mb-8 flex flex-col items-center gap-1 text-zinc-600 transition-colors hover:text-zinc-400"
          aria-label="Scroll down"
        >
          <ChevronDownIcon className="h-5 w-5" />
        </motion.button>
      )}
    </section>
  );
}
