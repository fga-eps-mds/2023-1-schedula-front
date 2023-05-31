import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import { DeleteTutorialForm } from '../tutorial-delete-form';

interface TutorialModalProps extends Partial<ModalProps> {
  isOpen: boolean;
  tutorialsIds: string[];
  onClose: () => void;
  onClear: () => void;
  onDelete: () => void;
}

export function DeleteTutorialModal({
  onClose,
  onClear,
  onDelete,
  tutorialsIds,
  ...props
}: TutorialModalProps) {
  return (
    <Modal size="2xl" title="Atenção" onClose={onClose} {...props}>
      <DeleteTutorialForm
        tutorialsIds={tutorialsIds}
        onClose={onClose}
        onClear={onClear}
        onDelete={onDelete}
      />
    </Modal>
  );
}
