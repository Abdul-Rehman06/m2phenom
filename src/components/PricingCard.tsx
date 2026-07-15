import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface PricingFeature {
  name: string;
  included: boolean;
}

export interface PricingCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onAnimationStart"> {
  tierName: string;
  price: string | number;
  billingCycle?: string;
  description?: string;
  features: PricingFeature[];
  isPopular?: boolean;
  buttonText?: string;
  onSubscribe?: () => void;
}

export const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      tierName,
      price,
      billingCycle = '/month',
      description,
      features,
      isPopular,
      buttonText = 'Get Started',
      onSubscribe,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.02 }}
        className={cn(
          'relative flex flex-col rounded-2xl border p-8 shadow-sm',
          isPopular
            ? 'border-blue-500 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-900/20'
            : 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950',
          className
        )}
        {...(props as any)}
      >
        {isPopular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
            Most Popular
          </div>
        )}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{tierName}</h3>
          {description && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
        <div className="mb-6 flex items-baseline text-gray-900 dark:text-white">
          <span className="text-4xl font-extrabold tracking-tight">{price}</span>
          <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            {billingCycle}
          </span>
        </div>
        <ul className="mb-8 flex-1 space-y-4 text-sm text-gray-600 dark:text-gray-300">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <svg
                className={cn(
                  'mr-3 h-5 w-5 shrink-0',
                  feature.included ? 'text-green-500' : 'text-gray-300 dark:text-gray-700'
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className={cn(!feature.included && 'line-through opacity-50')}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
        <button
          onClick={onSubscribe}
          className={cn(
            'w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-colors focus:outline-none focus:ring-4',
            isPopular
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300 dark:focus:ring-blue-800'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800'
          )}
        >
          {buttonText}
        </button>
      </motion.div>
    );
  }
);

PricingCard.displayName = 'PricingCard';
