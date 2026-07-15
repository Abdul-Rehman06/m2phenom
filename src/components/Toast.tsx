import React, { useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ToastVariant = 'primary' | 'secondary' | 'danger' | 'success';

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: ToastVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  duration?: number;
  onClose?: () => void;
  isOpen: boolean;
}

const variantClasses: Record<ToastVariant, string> = {
  primary: 'bg-blue-600 text-white',
  secondary: 'bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900',
  danger: 'bg-red-600 text-white',
  success: 'bg-green-600 text-white',
};

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = 'secondary', title, description, duration = 3000, onClose, isOpen, ...props }, ref) => {
    useEffect(() => {
      if (isOpen && duration > 0 && onClose) {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
      }
    }, [isOpen, duration, onClose]);

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={cn(
              'pointer-events-auto flex w-full max-w-md rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden',
              variantClasses[variant],
              className
            )}
            {...(props as any)}
          >
            <div className="w-full p-4 flex items-start">
              <div className="flex-1">
                {title && <p className="text-sm font-medium">{title}</p>}
                {description && <p className="mt-1 text-sm opacity-90">{description}</p>}
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="ml-4 flex-shrink-0 inline-flex text-white opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
Toast.displayName = 'Toast';
