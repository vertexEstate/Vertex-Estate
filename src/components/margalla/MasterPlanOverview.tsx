import { motion } from 'framer-motion';
import { DHA_ISLAMABAD_LOGO } from '../../config/margallaAssets';
import { margallaMasterPlanOverview } from '../../data/margallaOrchardsContent';

export function MasterPlanOverview({ showIntro = true }: { showIntro?: boolean }) {
  const { intro, stats } = margallaMasterPlanOverview;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:items-start lg:gap-14 xl:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55 }}
        className="mx-auto flex max-w-[220px] flex-col items-center lg:mx-0 lg:max-w-none"
      >
        <div className="relative rounded-full border border-accent-green-border bg-white/5 p-3 shadow-[0_0_40px_rgba(34,197,94,0.08)] dark:bg-navy-900/60">
          <img
            src={DHA_ISLAMABAD_LOGO}
            alt="Defence Housing Authority Islamabad-Rawalpindi"
            className="h-44 w-44 rounded-full object-contain sm:h-48 sm:w-48"
            loading="lazy"
            decoding="async"
          />
        </div>
        <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 lg:text-left">
          DHA Islamabad-Rawalpindi
        </p>
      </motion.div>

      <div className="min-w-0">
        {showIntro && (
          <p className="max-w-3xl text-base leading-relaxed text-navy-600 dark:text-zinc-400">
            {intro}
          </p>
        )}

        <div className={`grid gap-4 sm:grid-cols-2 xl:grid-cols-3 ${showIntro ? 'mt-8 lg:mt-10' : ''}`}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="rounded-2xl border border-navy-100/80 bg-white/80 p-5 transition-colors hover:border-accent-green-border dark:border-navy-700 dark:bg-navy-900/50 dark:hover:border-accent-green-border"
            >
              <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-green" aria-hidden />
                {stat.label}
              </p>
              <p
                className={`mt-2 font-display font-bold text-navy-900 dark:text-cream ${
                  stat.value === 'Margalla Orchards Walk'
                    ? 'text-lg leading-snug sm:text-xl'
                    : 'text-2xl sm:text-3xl'
                }`}
              >
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
