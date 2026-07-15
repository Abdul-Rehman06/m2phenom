import React, { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ value, onChange, placeholder = 'Select date', className, disabled, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    // Simple mock for calendar grid
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const dates = Array.from({ length: 31 }, (_, i) => i + 1);

    const handleSelect = (day: number) => {
      if (onChange) {
        const newDate = new Date();
        newDate.setDate(day);
        onChange(newDate);
      }
      setIsOpen(false);
    };

    const formattedDate = value ? value.toLocaleDateString() : '';

    return (
      <div ref={ref} className={cn('relative w-full max-w-xs', className)}>
        <div
          className={cn(
            'flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <input
            readOnly
            value={formattedDate}
            placeholder={placeholder}
            className="w-full cursor-pointer bg-transparent outline-none placeholder:text-gray-400"
            disabled={disabled}
            {...(props as any)}
          />
          <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute z-50 mt-2 w-full rounded-md border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-2 flex items-center justify-between">
                <button type="button" className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                  &lt;
                </button>
                <span className="text-sm font-medium dark:text-gray-200">
                  {value ? value.toLocaleString('default', { month: 'long', year: 'numeric' }) : 'Current Month'}
                </span>
                <button type="button" className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                  &gt;
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                {days.map(day => <div key={day}>{day}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1 text-sm">
                {dates.map((date) => {
                  const isSelected = value?.getDate() === date;
                  return (
                    <button
                      key={date}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(date);
                      }}
                      className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition-colors',
                        isSelected && 'bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
                      )}
                    >
                      {date}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
