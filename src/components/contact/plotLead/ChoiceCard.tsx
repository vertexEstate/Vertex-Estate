import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';

type Props = {
  label: string;
  description?: string;
  badge?: string;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
};

export function ChoiceCard({
  label,
  description,
  badge,
  selected,
  onClick,
  compact,
}: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`group relative w-full rounded-2xl border-2 px-4 py-4 text-left transition-all sm:px-5 sm:py-5 ${
        selected
          ? 'border-accent-green bg-accent-green-soft ring-1 ring-accent-green-border'
          : 'border-navy-200/90 bg-white/80 hover:border-accent-green-border hover:bg-accent-green-soft dark:border-navy-600 dark:bg-navy-800/50 dark:hover:border-accent-green-border'
      } ${compact ? 'py-3.5 sm:py-4' : ''}`}
    >
      {badge && (
        <span className="mb-2 inline-flex rounded-full bg-accent-green-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-green">
          {badge}
        </span>
      )}
      <span
        className={`block font-semibold ${compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'} ${
          selected ? 'text-navy-900 dark:text-cream' : 'text-navy-800 dark:text-cream/90'
        }`}
      >
        {label}
      </span>
      {description && (
        <span className="mt-1 block text-sm leading-snug text-navy-600 dark:text-cream/65">
          {description}
        </span>
      )}
      {selected && (
        <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent-green text-white sm:right-4 sm:top-4">
          <CheckIcon className="h-3.5 w-3.5" aria-hidden />
        </span>
      )}
    </motion.button>
  );
}
