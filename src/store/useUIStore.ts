import { create } from 'zustand';
import { ReactNode } from 'react';

type ToastNotification = {
  id: string;
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
};

type UIState = {
  // Command Palette
  isCommandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  
  // Global Modals
  modalContent: ReactNode | null;
  modalSize: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  openModal: (content: ReactNode, size?: 'sm' | 'md' | 'lg' | 'xl' | 'full') => void;
  closeModal: () => void;

  // Global Drawers
  drawerContent: ReactNode | null;
  drawerPosition: 'top' | 'right' | 'bottom' | 'left';
  drawerSize: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  openDrawer: (content: ReactNode, position?: 'top' | 'right' | 'bottom' | 'left', size?: 'sm' | 'md' | 'lg' | 'xl' | 'full') => void;
  closeDrawer: () => void;

  // Confirmation Dialog
  confirmDialogConfig: {
    isOpen: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'primary' | 'danger';
    onConfirm?: () => void;
  } | null;
  openConfirmDialog: (config: Omit<UIState['confirmDialogConfig'], 'isOpen'>) => void;
  closeConfirmDialog: () => void;

  // Notifications (Toast)
  toasts: ToastNotification[];
  addToast: (toast: Omit<ToastNotification, 'id'>) => void;
  removeToast: (id: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  isCommandPaletteOpen: false,
  openCommandPalette: () => set({ isCommandPaletteOpen: true }),
  closeCommandPalette: () => set({ isCommandPaletteOpen: false }),

  modalContent: null,
  modalSize: 'md',
  openModal: (content, size = 'md') => set({ modalContent: content, modalSize: size }),
  closeModal: () => set({ modalContent: null }),

  drawerContent: null,
  drawerPosition: 'right',
  drawerSize: 'md',
  openDrawer: (content, position = 'right', size = 'md') => set({ drawerContent: content, drawerPosition: position, drawerSize: size }),
  closeDrawer: () => set({ drawerContent: null }),

  confirmDialogConfig: null,
  openConfirmDialog: (config) => set({ confirmDialogConfig: { ...config, isOpen: true } as any }),
  closeConfirmDialog: () => set({ confirmDialogConfig: null }),

  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    // Auto remove after 5 seconds
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 5000);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
