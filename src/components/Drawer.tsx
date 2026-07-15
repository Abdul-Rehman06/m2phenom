import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
  className?: string;
  sizeClass?: string;
  closeOnOverlayClick?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = 'right',
  children,
  className,
  sizeClass = 'max-w-md',
  closeOnOverlayClick = true,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const variants = {
    top: { initial: { y: '-100%' }, animate: { y: 0 }, exit: { y: '-100%' } },
    right: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } },
    bottom: { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } },
    left: { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } },
  };

  const positionClasses = {
    top: 'top-0 left-0 right-0 w-full',
    right: `top-0 right-0 bottom-0 h-full w-full ${sizeClass}`,
    bottom: 'bottom-0 left-0 right-0 w-full',
    left: `top-0 left-0 bottom-0 h-full w-full ${sizeClass}`,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => closeOnOverlayClick && onClose()}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={variants[position].initial}
            animate={variants[position].animate}
            exit={variants[position].exit}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              'absolute bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto flex flex-col',
              positionClasses[position],
              className
            )}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
