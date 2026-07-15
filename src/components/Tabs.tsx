import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

export interface Tab {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultActiveId?: string;
  variant?: 'underline' | 'pills';
  className?: string;
  onChange?: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveId,
  variant = 'underline',
  className,
  onChange,
}) => {
  const [activeId, setActiveId] = useState<string>(defaultActiveId || tabs[0]?.id);

  const handleTabChange = (id: string) => {
    setActiveId(id);
    if (onChange) onChange(id);
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'flex space-x-1 overflow-x-auto no-scrollbar',
          variant === 'underline' ? 'border-b border-gray-200 dark:border-gray-800' : 'p-1 bg-gray-100 dark:bg-gray-800 rounded-xl'
        )}
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeId === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'relative px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap focus:outline-none',
                variant === 'underline'
                  ? cn('hover:text-blue-600 dark:hover:text-blue-400', isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400')
                  : cn('rounded-lg z-10', isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white')
              )}
              role="tab"
              aria-selected={isActive}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId={`active-tab-${variant}`}
                  className={cn(
                    'absolute',
                    variant === 'underline'
                      ? 'bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400'
                      : 'inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-sm -z-10'
                  )}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeId)?.content}
      </div>
    </div>
  );
};
