import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.04 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  const lineAlign =
    align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : '';
  const lineOrigin =
    align === 'center'
      ? 'origin-center'
      : align === 'right'
        ? 'origin-right'
        : 'origin-left';

  return (
    <motion.div
      className={alignClass[align]}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-48px' }}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400 backdrop-blur-md sm:mb-4 sm:px-4 sm:text-xs sm:tracking-[0.2em] dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-green" aria-hidden />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className="font-display text-[1.65rem] font-bold leading-[1.1] tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-[3.35rem] lg:leading-[1.06]"
      >
        <span className="text-charcoal dark:text-white">
          {title}
        </span>
      </motion.h2>
      <motion.div
        variants={fadeUp}
        className={`mt-5 h-px w-16 rounded-full bg-white/20 ${lineAlign} ${lineOrigin}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`mt-5 max-w-2xl text-base leading-relaxed text-navy-600 dark:text-cream/75 sm:text-lg ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
