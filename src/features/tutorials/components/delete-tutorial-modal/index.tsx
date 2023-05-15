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
import { TutorialForm } from '../tutorial-form/indext';
import { DeleteTutorialForm } from '../tutorial-delete-form';

interface UserModalProps extends Partial<ModalProps> {
  user?: User | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteTutorialModal({
  onClose,
  user,
  ...props
}: UserModalProps) {
  const { mutate: createUser, isLoading: isCreatingUser } = usePostCreateUser({
    onSuccessCallBack: onClose,
  });

  const { mutate: updateUser, isLoading: isUpdatingUser } = usePutUpdateUser({
    onSuccessCallBack: onClose,
  });

  const handleSubmit = useCallback(
    async ({
      name,
      email,
      position,
      profile,
      username,
      password,
    }: UserFormValues) => {
      const payload: PostCreateUserParams = {
        name,
        username,
        email,
        position,
        profile: profile?.value,
        password,
      };

      if (user?.id) {
        updateUser({
          userId: user.id,
          data: payload,
        });
      } else {
        createUser(payload);
      }
    },
    [createUser, updateUser, user?.id]
  );

  return (
    <Modal size="2xl" title="Atenção" onClose={onClose} {...props}>
      <DeleteTutorialForm />
    </Modal>
  );
}
