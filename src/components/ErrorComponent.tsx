import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ErrorComponentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onAnimationStart"> {
  title?: string;
  description?: string;
  error?: Error;
  retryAction?: () => void;
  actionLabel?: string;
}

export const ErrorComponent = React.forwardRef<HTMLDivElement, ErrorComponentProps>(
  ({ className, title = 'Something went wrong', description = 'An unexpected error occurred.', error, retryAction, actionLabel = 'Try again', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center justify-center p-8 text-center rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50', className)}
        {...(props as any)}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 max-w-md flex flex-col items-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            {error && (
              <div className="mt-4 rounded bg-red-100/50 p-2 text-xs text-red-800 dark:bg-red-900/30 dark:text-red-300 overflow-auto max-h-32 text-left">
                <code>{error.message || error.toString()}</code>
              </div>
            )}
          </div>
          {retryAction && (
            <button
              onClick={retryAction}
              className="mt-4 inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
            >
              {actionLabel}
            </button>
          )}
        </motion.div>
      </div>
    );
  }
);
ErrorComponent.displayName = 'ErrorComponent';
