import React, { forwardRef, InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  isInvalid?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, isInvalid, checked, disabled, id, ...props }, ref) => {
    const generatedId = id || React.useId();

    return (
      <div className="flex items-center">
        <div className="relative flex items-center justify-center">
          <input
            type="radio"
            id={generatedId}
            ref={ref}
            checked={checked}
            disabled={disabled}
            className={cn(
              'peer h-5 w-5 appearance-none rounded-full border border-gray-300 bg-white transition-all checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              isInvalid && 'border-red-500 focus:ring-red-500',
              className
            )}
            {...(props as any)}
          />
          <motion.div
            initial={false}
            animate={{
              scale: checked ? 1 : 0,
              opacity: checked ? 1 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="pointer-events-none absolute h-2.5 w-2.5 rounded-full bg-blue-600"
          />
        </div>
        {label && (
          <label
            htmlFor={generatedId}
            className={cn(
              'ml-2 text-sm font-medium text-gray-700 select-none',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Radio.displayName = 'Radio';