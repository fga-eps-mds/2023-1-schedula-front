import { useCallback } from 'react';
import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import { AlertForm } from '../alert-form';
import { Alert, AlertPayload } from '../../type';
import { usePostCreateAlert } from '../../api/post-create-alerts';
import { PostCreateAlertParams } from '../../api/types';
import { useAuth } from '@/contexts/AuthContext';

interface AlertModalProps extends Partial<ModalProps> {
  alert?: Alert;
  isOpen: boolean;
  onClose: () => void;
  handleSubmitAlert: () => void;
}

export function AlertModal({ onClose, alert, handleSubmitAlert, ...props }: AlertModalProps) {
  const { mutate: createAlert, isLoading: isCreatingAlert } =
    usePostCreateAlert({
      onSuccessCallBack: onClose,
    });

  const { user } = useAuth();

  const handleSubmit = useCallback(
    async ({ target, message }: AlertPayload) => {
      const { label, value } = target
      const targetName = label
      const targetEmail = value
      const sourceName = user?.name
      const sourceEmail = user?.email
      const pendency = ""
      const read = false
      const status = "unsolved"
      let date = new Date();
      date.setHours(date.getHours() - 3);
      const createdAt = date;
      const payload: PostCreateAlertParams = {
        sourceName, targetName, sourceEmail, targetEmail, message, status, pendency, read, createdAt
      };
      createAlert(payload);
      handleSubmitAlert();
    },
    [createAlert, alert]
  );

  return (
    <Modal
      title="Criar alerta"
      size="2xl"
      onClose={onClose}
      {...props}
    >
      <AlertForm
        onSubmit={handleSubmit}
        isSubmitting={isCreatingAlert}
      />
    </Modal>
  );
}
