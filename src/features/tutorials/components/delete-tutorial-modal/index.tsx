import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import { DeleteTutorialForm } from '../tutorial-delete-form';

interface TutorialModalProps extends Partial<ModalProps> {
  isOpen: boolean;
  onClose: () => void;
  tutorialsIds: string[];
}

export function DeleteTutorialModal({
  onClose,
  tutorialsIds,
  ...props
}: TutorialModalProps) {
  return (
    <Modal size="2xl" title="Atenção" onClose={onClose} {...props}>
      <DeleteTutorialForm tutorialsIds={tutorialsIds} onClose={onClose} />
    </Modal>
  );
}
