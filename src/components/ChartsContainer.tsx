import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ChartsContainerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  isLoading?: boolean;
}

export const ChartsContainer = React.forwardRef<HTMLDivElement, ChartsContainerProps>(
  ({ title, subtitle, actions, isLoading, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900',
          className
        )}
        {...(props as any)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 p-5 dark:border-gray-800">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
        <div className="relative p-5">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-b-xl bg-white/50 backdrop-blur-sm dark:bg-gray-900/50">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-400"
              />
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }
);

ChartsContainer.displayName = 'ChartsContainer';
