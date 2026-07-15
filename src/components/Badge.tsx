import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type BadgeVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onAnimationStart"> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 border-transparent',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 border-transparent',
  outline: 'text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700',
  ghost: 'bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 border-transparent',
  danger: 'bg-red-600 text-white hover:bg-red-700 border-transparent',
  success: 'bg-green-600 text-white hover:bg-green-700 border-transparent',
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
          variantClasses[variant],
          className
        )}
        {...(props as any)}
      />
    );
  }
);

Badge.displayName = 'Badge';
