import { forwardRef } from 'react';

import { Input, InputProps } from './Input';
import { cn } from '@/utils';

export interface SearchInputProps extends InputProps {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onChange, onClear, ...props }, ref) => {
    const hasValue = value !== undefined && value !== null && String(value).length > 0;

    const SearchIcon = (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    );

    const ClearButton = hasValue ? (
      <button
        type="button"
        onClick={onClear}
        className="rounded-full p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Clear search"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    ) : undefined;

    return (
      <Input
        ref={ref}
        type="search"
        value={value}
        onChange={onChange}
        leftIcon={SearchIcon}
        rightIcon={ClearButton}
        className={cn('[&::-webkit-search-cancel-button]:hidden', className)}
        {...(props as any)}
      />
    );
  }
);
SearchInput.displayName = 'SearchInput';