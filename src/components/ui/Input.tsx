import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className = '', ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-navy-700 dark:text-cream">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full rounded-xl border border-navy-200/90 bg-white px-4 py-3.5 text-charcoal shadow-sm placeholder:text-navy-400 outline-none transition-all focus:border-gold-500 focus:ring-2 focus:ring-gold-500/15 dark:border-navy-600 dark:bg-navy-900 dark:text-cream dark:placeholder:text-cream/40 dark:focus:border-gold-400 dark:focus:ring-gold-400/20 ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});
