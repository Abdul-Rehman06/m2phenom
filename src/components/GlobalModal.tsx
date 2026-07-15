import { useUIStore } from '@/store';
import { Modal } from './Modal';

export function GlobalModal() {
  const { modalContent, modalSize, closeModal } = useUIStore();

  return (
    <Modal isOpen={!!modalContent} onClose={closeModal} size={modalSize}>
      {modalContent}
    </Modal>
  );
}
