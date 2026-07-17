import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'Is DHA Margalla Orchard a verified DHA project?',
    a: 'Yes. Margalla Orchards is developed under DHA Islamabad supervision with SCBAP and FGEHA approvals. Vertex Estate provides official documentation and maps for every inquiry.',
  },
  {
    q: 'What plot sizes are available?',
    a: 'Residential plots are available in 10 Marla, 14 Marla, and 1 Kanal sizes. Commercial inventory varies by block — contact us for the latest availability.',
  },
  {
    q: 'How do payment plans work?',
    a: 'We offer flexible installment plans with a down payment and monthly installments over 36–48 months. Exact terms depend on plot size and block. Our team shares a clear quote with no hidden fees.',
  },
  {
    q: 'Can I book a free site visit?',
    a: 'Absolutely. Fill out our contact form or message us on WhatsApp. A property consultant will arrange a guided visit at your preferred time.',
  },
  {
    q: 'Why choose Vertex Estate over other agents?',
    a: 'We are a registered real estate company with 15+ years of experience, dedicated DHA project expertise, transparent pricing, and end-to-end support from inquiry to transfer.',
  },
] as const;

export function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-2">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-xl border border-navy-100/90 bg-white shadow-sm dark:border-navy-700 dark:bg-navy-900/60"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-charcoal transition-colors hover:bg-cream/80 dark:text-cream dark:hover:bg-navy-800/50"
            >
              <span>{item.q}</span>
              <ChevronDownIcon
                className={`h-5 w-5 shrink-0 text-gold-600 transition-transform dark:text-gold-400 ${isOpen ? 'rotate-180' : ''}`}
                strokeWidth={1.5}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="border-t border-navy-100 px-5 py-4 text-sm leading-relaxed text-navy-600 dark:border-navy-700 dark:text-cream/75">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
