import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  type?: NotificationType;
  title: string;
  message?: string;
  onClose?: () => void;
  isVisible?: boolean;
}

const typeConfig = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    border: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-500 dark:text-blue-400',
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-900/30',
    border: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-500 dark:text-green-400',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/30',
    border: 'border-yellow-200 dark:border-yellow-800',
    iconColor: 'text-yellow-500 dark:text-yellow-400',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/30',
    border: 'border-red-200 dark:border-red-800',
    iconColor: 'text-red-500 dark:text-red-400',
  },
};

export const NotificationCard = React.forwardRef<HTMLDivElement, NotificationCardProps>(
  ({ type = 'info', title, message, onClose, isVisible = true, className, ...props }, ref) => {
    const config = typeConfig[type];

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              'relative flex w-full max-w-sm rounded-lg border p-4 shadow-md',
              config.bg,
              config.border,
              className
            )}
            {...(props as any)}
          >
            <div className={cn('mr-3 shrink-0 mt-0.5', config.iconColor)}>
              {/* Generic indicator */}
              <div className="h-5 w-5 rounded-full border-2 border-current opacity-80" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h4>
              {message && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{message}</p>
              )}
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="ml-4 shrink-0 self-start rounded-md p-1 text-gray-400 hover:bg-black/5 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:hover:bg-white/10 dark:hover:text-gray-300"
              >
                <span className="sr-only">Close</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

NotificationCard.displayName = 'NotificationCard';
