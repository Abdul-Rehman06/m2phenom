import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ProgressVariant = 'primary' | 'secondary' | 'danger' | 'success';

export interface ProgressBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onAnimationStart"> {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  showLabel?: boolean;
}

const variantClasses: Record<ProgressVariant, string> = {
  primary: 'bg-blue-600',
  secondary: 'bg-gray-600 dark:bg-gray-300',
  danger: 'bg-red-600',
  success: 'bg-green-600',
};

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value = 0, max = 100, variant = 'primary', showLabel = false, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div className={cn('w-full', className)} ref={ref} {...(props as any)}>
        {showLabel && (
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{Math.round(percentage)}%</span>
          </div>
        )}
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
          <motion.div
            className={cn('h-full w-full flex-1 transition-all', variantClasses[variant])}
            initial={{ x: '-100%' }}
            animate={{ x: `-${100 - percentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    );
  }
);
ProgressBar.displayName = 'ProgressBar';
