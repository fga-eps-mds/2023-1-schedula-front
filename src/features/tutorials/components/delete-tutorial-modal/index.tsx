import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import { User } from '@/features/users/api/types';
import { DeleteTutorialForm } from '../tutorial-delete-form';

interface TutorialModalProps extends Partial<ModalProps> {
  user?: User | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteTutorialModal({
  onClose,
  user,
  ...props
}: TutorialModalProps) {
  return (
    <Modal size="2xl" title="Atenção" onClose={onClose} {...props}>
      <DeleteTutorialForm />
    </Modal>
  );
}
