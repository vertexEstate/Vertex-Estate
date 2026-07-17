import { motion } from 'framer-motion';
import {
  Building2Icon,
  LineChartIcon,
  MapPinIcon,
  WalletIcon,
} from 'lucide-react';

const BENEFITS = [
  {
    icon: Building2Icon,
    title: 'Prime DHA locations',
    description: 'Access to Islamabad\'s most sought-after supervised societies with world-class infrastructure.',
  },
  {
    icon: LineChartIcon,
    title: 'Strong capital growth',
    description: 'Park Road and Margalla corridor plots have shown consistent appreciation year over year.',
  },
  {
    icon: WalletIcon,
    title: 'Flexible payment plans',
    description: 'Installment options tailored to your timeline — from immediate purchase to phased development.',
  },
  {
    icon: MapPinIcon,
    title: 'Strategic connectivity',
    description: 'Minutes from COMSATS, F-7 Markaz, and major Islamabad business districts.',
  },
] as const;

export function InvestmentBenefits() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {BENEFITS.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: i * 0.06 }}
          className="flex gap-5 rounded-2xl border border-white/[0.08] bg-navy-900/50 p-6 shadow-luxury-card backdrop-blur-sm dark:border-white/[0.08]"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-300">
            <item.icon className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-zinc-100">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
