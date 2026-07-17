import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  horizonMallOverview,
  HORIZON_MALL_PROMO,
  HORIZON_PROJECT_PATH,
} from '../../data/horizonMallContent';
import { Button } from '../ui/Button';
import { WhatsAppContactButton } from '../ui/WhatsAppContactButton';
import { whatsAppMessageForProject } from '../../lib/whatsapp';

export function HorizonMallOverview() {
  const { tagline, intro, stats } = horizonMallOverview;

  return (
    <div className="rounded-2xl border border-navy-100/80 bg-white/80 p-6 dark:border-navy-700 dark:bg-navy-900/50 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:items-start lg:gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-[220px] flex-col items-center lg:mx-0"
        >
          <Link
            to={`${HORIZON_PROJECT_PATH}#overview`}
            className="group block overflow-hidden rounded-2xl border border-accent-green-border bg-navy-950 shadow-[0_0_40px_rgba(34,197,94,0.1)] transition-transform hover:scale-[1.02]"
            aria-label="Open Horizon Mall project page"
          >
            <img
              src={HORIZON_MALL_PROMO}
              alt="Horizon Mall building — Islamabad"
              className="w-full object-contain p-2"
              loading="lazy"
            />
          </Link>
          <span className="mt-3 rounded-full bg-accent-green px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            New
          </span>
          <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
            {tagline}
          </p>
        </motion.div>

        <div className="min-w-0">
          <p className="max-w-3xl text-base leading-relaxed text-navy-600 dark:text-zinc-400">
            {intro}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-navy-100/80 bg-cream/50 p-4 dark:border-navy-600 dark:bg-navy-800/40"
              >
                <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-green" aria-hidden />
                  {stat.label}
                </p>
                <p className="mt-1.5 font-display text-lg font-bold text-navy-900 dark:text-cream">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={`${HORIZON_PROJECT_PATH}#overview`}>
              <Button variant="outline">View Horizon Mall</Button>
            </Link>
            <WhatsAppContactButton
              message={whatsAppMessageForProject('Horizon Mall')}
              label="Inquire on WhatsApp"
              size="md"
              variant="soft"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
