import { useCallback } from 'react';
import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import { PostCreateUserParams, User } from '@/features/users/api/types';
import { usePostCreateUser } from '@/features/users/api/post-create-user';
import { usePutUpdateUser } from '@/features/users/api/put-update-user';
import {
  UserForm,
  UserFormValues,
} from '@/features/users/components/user-form';
import { TutorialForm } from '../tutorial-form';
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
