import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SuccessComponentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onAnimationStart"> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const SuccessComponent = React.forwardRef<HTMLDivElement, SuccessComponentProps>(
  ({ className, title = 'Success!', description = 'The operation was completed successfully.', action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center justify-center p-8 text-center rounded-xl bg-green-50/50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/50', className)}
        {...(props as any)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4 max-w-md flex flex-col items-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </motion.div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          </div>
          {action && <div className="pt-4">{action}</div>}
        </motion.div>
      </div>
    );
  }
);
SuccessComponent.displayName = 'SuccessComponent';
