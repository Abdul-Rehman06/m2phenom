import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface StatsCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  value: React.ReactNode;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  trend?: {
    value: number;
    label?: string;
    direction?: 'up' | 'down' | 'neutral';
  };
}

export const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ className, title, value, icon, description, trend, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn('overflow-hidden', className)} {...(props as any)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon && <div className="text-gray-500 dark:text-gray-400">{icon}</div>}
        </CardHeader>
        <CardContent>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold"
          >
            {value}
          </motion.div>
          {(description || trend) && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              {trend && (
                <span
                  className={cn(
                    'font-medium',
                    trend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 
                    trend.direction === 'down' ? 'text-red-600 dark:text-red-400' : 
                    'text-gray-600 dark:text-gray-400'
                  )}
                >
                  {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : ''} {Math.abs(trend.value)}%
                </span>
              )}
              {trend?.label && <span>{trend.label}</span>}
              {description && !trend && <span>{description}</span>}
            </p>
          )}
        </CardContent>
      </Card>
    );
  }
);
StatsCard.displayName = 'StatsCard';
