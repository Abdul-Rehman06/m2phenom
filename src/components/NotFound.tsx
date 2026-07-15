import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface NotFoundProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onAnimationStart"> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const NotFound = React.forwardRef<HTMLDivElement, NotFoundProps>(
  ({ className, title = '404 - Page Not Found', description = "The page you are looking for doesn't exist or has been moved.", action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex min-h-[400px] flex-col items-center justify-center p-8 text-center', className)}
        {...(props as any)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-md"
        >
          <div className="text-8xl font-extrabold tracking-tighter text-gray-200 dark:text-gray-800">
            404
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
            <p className="text-gray-500 dark:text-gray-400">{description}</p>
          </div>
          {action && <div>{action}</div>}
        </motion.div>
      </div>
    );
  }
);
NotFound.displayName = 'NotFound';
