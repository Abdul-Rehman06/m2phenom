import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

export interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onAnimationStart"> {
  variant?: 'circular' | 'rectangular' | 'text';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  style,
  ...props
}) => {
  const variants = {
    circular: 'rounded-full',
    rectangular: 'rounded-md',
    text: 'rounded-md h-4 w-full',
  };

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        repeat: Infinity,
        repeatType: "mirror",
        duration: 1.2,
        ease: "easeInOut",
      }}
      className={cn('bg-gray-200', variants[variant], className)}
      style={{ width, height, ...style }}
      {...(props as any)}
    />
  );
};