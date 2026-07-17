import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
  > {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'light';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  onClick,
  ...props
}: ButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const baseStyles = [
    'relative overflow-hidden',
    'inline-flex items-center justify-center gap-2',
    'font-sans font-medium tracking-[0.06em] uppercase',
    'rounded-full',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    'disabled:pointer-events-none disabled:opacity-45',
  ].join(' ');

  const variants = {
    /* DiyWeb: white outline pill on dark */
    primary: [
      'border border-white/25 bg-transparent text-white',
      'hover:bg-white/10 hover:border-white/45',
      'active:bg-white/15',
      'dark:border-white/25 dark:text-white',
    ].join(' '),
    secondary: [
      'border border-white/15 bg-white text-black',
      'hover:bg-zinc-200 hover:border-white',
      'active:bg-zinc-300',
    ].join(' '),
    outline: [
      'border border-white/20 bg-transparent text-zinc-300',
      'hover:border-white/40 hover:text-white',
      'dark:border-white/20 dark:text-zinc-300 dark:hover:text-white',
    ].join(' '),
    ghost: [
      'border border-transparent bg-transparent text-zinc-400',
      'hover:text-white hover:bg-white/5',
    ].join(' '),
    light: [
      'border border-white/20 bg-white/5 text-white backdrop-blur-sm',
      'hover:bg-white/10 hover:border-white/35',
    ].join(' '),
  };

  const sizes = {
    sm: 'min-h-[2.25rem] px-5 py-2 text-[0.6875rem] leading-tight',
    md: 'min-h-[2.75rem] px-6 py-2.5 text-[0.75rem] leading-snug',
    lg: 'min-h-[3rem] px-8 py-3 text-xs leading-snug sm:text-[0.8125rem]',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rippleSize = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - rippleSize / 2;
    const y = e.clientY - rect.top - rippleSize / 2;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y, size: rippleSize }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
    onClick?.(e);
  };

  const rippleColor = 'bg-white/15';

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ opacity: 0.35, scale: 0 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className={`pointer-events-none absolute rounded-full ${rippleColor}`}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
      <span className="relative z-10 inline-flex items-center justify-center gap-2 [&_svg]:shrink-0">
        {children}
      </span>
    </motion.button>
  );
}
