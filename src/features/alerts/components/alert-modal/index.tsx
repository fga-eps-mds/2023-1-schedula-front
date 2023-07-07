import { useCallback, useEffect, useState } from 'react';
import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import { AlertForm } from '../alert-form';
import { Alert, AlertPayload } from '../../type';
import { usePostCreateAlert } from '../../api/post-create-alerts';
import { PostCreateAlertParams } from '../../api/types';
import { useAuth } from '@/contexts/AuthContext';
import { useGetAllUsers } from '@/features/users/api/get-all-users';

interface AlertModalProps extends Partial<ModalProps> {
  alert?: Alert;
  isOpen: boolean;
  onClose: () => void;
  handleSubmitAlert: () => void;
}

export function AlertModal({
  onClose,
  alert,
  handleSubmitAlert,
  ...props
}: AlertModalProps) {
  const { mutate: createAlert, isLoading: isCreatingAlert } =
    usePostCreateAlert({
      onSuccessCallBack: onClose,
    });

  const { data: users, isLoading: isLoadingUsers } = useGetAllUsers();
  const [filterBasicUsers, setFilterBasicUsers] = useState(users || []);
  const { user } = useAuth();

  const userAuth = useAuth();

  const handleSubmit = useCallback(
    async ({ target, message }: AlertPayload) => {
      const { label, value } = target;
      const targetName = label;
      const targetEmail = value;
      const sourceName = user?.name;
      const sourceEmail = user?.email;
      const pendency = '';
      const read = false;
      const status = 'unsolved';
      const date = new Date();
      date.setHours(date.getHours() - 3);
      const createdAt = date;
      const payload: PostCreateAlertParams = {
        sourceName,
        targetName,
        sourceEmail,
        targetEmail,
        message,
        status,
        pendency,
        read,
        createdAt,
      };
      createAlert(payload);
      handleSubmitAlert();
    },
    [createAlert, handleSubmitAlert, user]
  );

  useEffect(() => {
    if (users) {
      const filteredUsers = users.filter(
        (user) =>
          (user.profile === 'BASIC' || user.profile === 'ADMIN') &&
          user.email !== userAuth.user?.email
      );
      setFilterBasicUsers(filteredUsers);
    }
  }, [users, userAuth.user?.email]);

  return (
    <Modal title="Criar alerta" size="2xl" onClose={onClose} {...props}>
      <AlertForm
        onSubmit={handleSubmit}
        isSubmitting={isCreatingAlert}
        users={filterBasicUsers}
        isLoadingUsers={isLoadingUsers}
      />
    </Modal>
  );
}
