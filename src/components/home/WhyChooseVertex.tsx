import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  GemIcon,
  HeadphonesIcon,
  TrendingUpIcon,
} from 'lucide-react';

const PILLARS = [
  {
    icon: ShieldCheckIcon,
    title: 'Trusted & transparent',
    description:
      'DHA-supervised developments with clear documentation, verified approvals, and honest guidance at every step.',
  },
  {
    icon: GemIcon,
    title: 'Premium curation',
    description:
      'We handpick societies and plots that meet international standards — location, infrastructure, and long-term value.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Dedicated consultants',
    description:
      'Personal property advisors available on WhatsApp, site visits, and in-office meetings across Islamabad.',
  },
  {
    icon: TrendingUpIcon,
    title: 'Investment-first approach',
    description:
      'Data-backed recommendations on payment plans, appreciation potential, and resale outlook for every buyer.',
  },
] as const;

export function WhyChooseVertex() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {PILLARS.map((item, i) => (
        <motion.article
          key={item.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-navy-900/60 p-6 shadow-luxury-card backdrop-blur-sm transition-all hover:border-gold-500/25 hover:shadow-luxury-card-hover dark:border-white/[0.08] dark:bg-navy-900/50"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800/8 ring-1 ring-navy-800/10 transition group-hover:bg-gold-500/12 group-hover:ring-gold-500/25 dark:bg-gold-500/10 dark:ring-gold-500/20">
            <item.icon className="h-6 w-6 text-navy-800 dark:text-gold-400" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-lg font-bold text-zinc-100">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {item.description}
          </p>
        </motion.article>
      ))}
    </div>
  );
}
