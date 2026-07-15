import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TimelineItem {
  id: string | number;
  title: React.ReactNode;
  description?: React.ReactNode;
  date: React.ReactNode;
  icon?: React.ReactNode;
  isActive?: boolean;
}

export interface TimelineProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onAnimationStart"> {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ items, orientation = 'vertical', className, ...props }, ref) => {
    const isVertical = orientation === 'vertical';

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          isVertical ? 'flex-col space-y-4' : 'flex-row space-x-4 overflow-x-auto pb-4',
          className
        )}
        {...(props as any)}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: isVertical ? 20 : 0, x: isVertical ? 0 : 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              'relative flex',
              isVertical ? 'flex-row gap-4 pb-4' : 'flex-col gap-4 pr-8 min-w-[200px]'
            )}
          >
            {/* Line */}
            {index !== items.length - 1 && (
              <div
                className={cn(
                  'absolute bg-gray-200 dark:bg-gray-700',
                  isVertical
                    ? 'left-5 top-10 bottom-0 w-px -ml-px'
                    : 'top-5 left-10 right-0 h-px -mt-px'
                )}
              />
            )}
            
            {/* Icon/Dot */}
            <div
              className={cn(
                'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-white dark:bg-gray-900 transition-colors duration-200',
                item.isActive
                  ? 'border-blue-500 text-blue-500'
                  : 'border-gray-300 text-gray-500 dark:border-gray-600'
              )}
            >
              {item.icon || <div className="h-3 w-3 rounded-full bg-current" />}
            </div>

            {/* Content */}
            <div className="flex flex-col pt-2">
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {item.title}
              </div>
              {item.date && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.date}
                </div>
              )}
              {item.description && (
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {item.description}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
);

Timeline.displayName = 'Timeline';
