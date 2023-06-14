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
}

export function AlertModal({ onClose, alert, ...props }: AlertModalProps) {
  const { mutate: createAlert, isLoading: isCreatingAlert } =
    usePostCreateAlert({
      onSuccessCallBack: onClose,
    });

  const { user } = useAuth();

  const handleSubmit = useCallback(
    async ({ target, message }: AlertPayload) => {
      console.log(target)
      const { label, value } = target
      const targetName = label
      const targetEmail = value
      const sourceName = user?.name
      const sourceEmail = user?.email
      const pendency = ""
      const read = false
      const status = "UNRESOLVED"
      const createdAt = new Date()
      const payload: PostCreateAlertParams = {
        sourceName, targetName, sourceEmail, targetEmail, message, status, pendency, read, createdAt
      };
      console.log(payload)
      createAlert(payload);
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
