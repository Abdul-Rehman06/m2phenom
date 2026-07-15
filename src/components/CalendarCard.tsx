import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CalendarEvent {
  id: string | number;
  title: string;
  time: string;
  type?: 'default' | 'primary' | 'warning' | 'danger';
}

export interface CalendarCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onAnimationStart"> {
  date: Date;
  events?: CalendarEvent[];
}

const typeStyles = {
  default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  primary: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
};

export const CalendarCard = React.forwardRef<HTMLDivElement, CalendarCardProps>(
  ({ date, events = [], className, ...props }, ref) => {
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const day = date.getDate();
    const weekday = date.toLocaleString('default', { weekday: 'long' });

    return (
      <motion.div
        ref={ref}
        whileHover={{ y: -2 }}
        className={cn(
          'flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900',
          className
        )}
        {...(props as any)}
      >
        <div className="bg-red-500 px-4 py-2 text-center text-white dark:bg-red-600">
          <span className="text-sm font-semibold uppercase tracking-wider">{month} {year}</span>
        </div>
        <div className="flex flex-col items-center justify-center p-6 pb-4">
          <span className="text-5xl font-bold text-gray-900 dark:text-white">{day}</span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{weekday}</span>
        </div>
        {events.length > 0 && (
          <div className="border-t border-gray-100 px-4 py-3 dark:border-gray-800">
            <h4 className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Upcoming
            </h4>
            <div className="space-y-2">
              {events.map((event) => (
                <div key={event.id} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate pr-2">
                    {event.title}
                  </span>
                  <span
                    className={cn(
                      'inline-block whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-semibold',
                      typeStyles[event.type || 'default']
                    )}
                  >
                    {event.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  }
);

CalendarCard.displayName = 'CalendarCard';
