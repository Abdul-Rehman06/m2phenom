import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ActivityItem {
  id: string | number;
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  target?: string;
  timestamp: string;
  content?: React.ReactNode;
}

export interface ActivityFeedProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onAnimationStart"> {
  items: ActivityItem[];
}

export const ActivityFeed = React.forwardRef<HTMLDivElement, ActivityFeedProps>(
  ({ items, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-6', className)} {...(props as any)}>
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex gap-4"
          >
            <div className="relative shrink-0">
              {item.user.avatar ? (
                <img
                  src={item.user.avatar}
                  alt={item.user.name}
                  className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 font-medium text-sm">
                  {item.user.name.charAt(0)}
                </div>
              )}
              {idx !== items.length - 1 && (
                <div className="absolute left-1/2 top-12 bottom-[-1.5rem] w-px -translate-x-1/2 bg-gray-200 dark:bg-gray-700" />
              )}
            </div>
            <div className="flex-1 pb-2">
              <div className="text-sm">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {item.user.name}
                </span>{' '}
                <span className="text-gray-600 dark:text-gray-400">{item.action}</span>{' '}
                {item.target && (
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {item.target}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {item.timestamp}
              </div>
              {item.content && (
                <div className="mt-2 rounded-md bg-gray-50 dark:bg-gray-800 p-3 text-sm text-gray-700 dark:text-gray-300">
                  {item.content}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
);

ActivityFeed.displayName = 'ActivityFeed';
