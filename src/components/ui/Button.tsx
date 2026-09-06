import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '../../lib/utils';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
};

export function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  const variants = {
    primary:
      'bg-slate-900 text-white hover:bg-slate-800 border border-slate-900 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200',
    secondary:
      'bg-white/5 text-slate-200 border border-white/15 hover:border-slate-300 hover:bg-white/10',
    ghost: 'text-slate-200 hover:text-white hover:bg-white/5 border border-transparent',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
