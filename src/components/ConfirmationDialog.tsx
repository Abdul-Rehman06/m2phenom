import { useUIStore } from '@/store';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

export function ConfirmationDialog() {
  const { confirmDialogConfig, closeConfirmDialog } = useUIStore();

  if (!confirmDialogConfig) return null;

  const { title, description, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'primary', onConfirm } = confirmDialogConfig;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    closeConfirmDialog();
  };

  return (
    <Modal isOpen={confirmDialogConfig.isOpen} onClose={closeConfirmDialog} size="sm">
      <div className="flex flex-col items-center text-center p-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${variant === 'danger' ? 'bg-danger-500/10 text-danger-500' : 'bg-primary-500/10 text-primary-500'}`}>
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
        <p className="text-surface-500 text-sm mb-6">{description}</p>
        
        <div className="flex items-center gap-3 w-full">
          <Button variant="outline" className="flex-1" onClick={closeConfirmDialog}>
            {cancelText}
          </Button>
          <Button variant={variant} className="flex-1" onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
