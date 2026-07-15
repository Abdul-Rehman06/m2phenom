import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Settings, User } from 'lucide-react';
import { useUIStore } from '@/store';
import { useNavigate } from 'react-router-dom';

const MOCK_RESULTS = [
  { id: 1, title: 'Go to Dashboard', icon: <FileText className="w-4 h-4" />, path: '/' },
  { id: 2, title: 'Manage Subscription', icon: <Settings className="w-4 h-4" />, path: '/pricing/manage-subscription' },
  { id: 3, title: 'Create Profile', icon: <User className="w-4 h-4" />, path: '/get-started/create-profile' },
];

export function CommandPalette() {
  const { isCommandPaletteOpen, closeCommandPalette, openCommandPalette } = useUIStore();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Keyboard Shortcut: Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isCommandPaletteOpen) {
          closeCommandPalette();
        } else {
          openCommandPalette();
        }
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isCommandPaletteOpen, closeCommandPalette, openCommandPalette]);

  // Focus input when opened
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isCommandPaletteOpen]);

  const handleSelect = (path: string) => {
    navigate(path);
    closeCommandPalette();
  };

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCommandPalette}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-lg bg-surface border border-border rounded-xl shadow-2xl overflow-hidden relative z-10"
          >
            <div className="flex items-center px-4 py-3 border-b border-border">
              <Search className="w-5 h-5 text-surface-400 mr-3" />
              <input
                ref={inputRef}
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-surface-400"
                placeholder="Search commands, pages, actions..."
              />
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-medium text-surface-400 bg-surface-100 dark:bg-white/10 rounded border border-border">ESC</kbd>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto p-2">
              <div className="text-xs font-medium text-surface-500 px-2 py-1.5 mb-1">
                Suggested
              </div>
              {MOCK_RESULTS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.path)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-surface-300 hover:text-white hover:bg-primary-500/10 hover:text-primary-500 rounded-lg transition-colors text-left group"
                >
                  <span className="text-surface-400 group-hover:text-primary-500">{item.icon}</span>
                  {item.title}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
