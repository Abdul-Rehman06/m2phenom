import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked = false, onCheckedChange, size = 'md', disabled, ...props }, ref) => {
    const sizes = {
      sm: { switch: 'w-8 h-4', knob: 'h-3 w-3', translate: 16 },
      md: { switch: 'w-11 h-6', knob: 'h-5 w-5', translate: 20 },
      lg: { switch: 'w-14 h-8', knob: 'h-7 w-7', translate: 24 },
    };

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        ref={ref}
        onClick={() => onCheckedChange?.(!checked)}
        disabled={disabled}
        className={cn(
          'relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          checked ? 'bg-blue-600' : 'bg-gray-200',
          sizes[size].switch,
          className
        )}
        {...(props as any)}
      >
        <motion.span
          layout
          initial={false}
          animate={{
            x: checked ? sizes[size].translate : 0
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            'pointer-events-none inline-block rounded-full bg-white shadow-lg ring-0',
            sizes[size].knob
          )}
        />
      </button>
    );
  }
);
Switch.displayName = 'Switch';