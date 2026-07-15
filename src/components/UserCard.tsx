import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface UserCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onAnimationStart"> {
  name: string;
  role?: string;
  avatarUrl?: string;
  bio?: string;
  onActionClick?: () => void;
  actionText?: string;
}

export const UserCard = React.forwardRef<HTMLDivElement, UserCardProps>(
  (
    { name, role, avatarUrl, bio, onActionClick, actionText = 'Follow', className, ...props },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{ y: -4 }}
        className={cn(
          'flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900',
          className
        )}
        {...(props as any)}
      >
        <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-gray-800">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-3xl font-bold text-gray-400 dark:bg-gray-800">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
        {role && <p className="mb-3 text-sm font-medium text-blue-600 dark:text-blue-400">{role}</p>}
        {bio && <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{bio}</p>}
        
        {onActionClick && (
          <button
            onClick={onActionClick}
            className="w-full rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:focus:ring-white dark:focus:ring-offset-gray-900"
          >
            {actionText}
          </button>
        )}
      </motion.div>
    );
  }
);

UserCard.displayName = 'UserCard';
