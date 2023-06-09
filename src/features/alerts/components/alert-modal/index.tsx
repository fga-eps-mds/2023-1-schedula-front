import { useCallback } from 'react';
import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import { AlertForm } from '../alert-form';
import { Alert, AlertPayload } from '../../type';
import { usePostCreateAlert } from '../../api/post-create-alerts';
import { usePutUpdateAlert } from '../../api/put-update-alerts';
import { PostCreateAlertParams } from '../../api/types';

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
  const { mutate: updateAlert, isLoading: isUpdatingAlert } = usePutUpdateAlert(
    {
      onSuccessCallBack: onClose,
    }
  );

  const handleSubmit = useCallback(
    async ({ name, category_id, file }: AlertPayload) => {
      if (!name || !category_id) {
        return;
      }
      const payload: PostCreateAlertParams = {
        name,
        category_id,
        file,
      };
      if (alert?.id && alert !== undefined) {
        updateAlert({
          alertId: alert.id,
          data: payload,
        });
      } else {
        createAlert(payload);
      }
    },
    [createAlert, updateAlert, alert]
  );

  return (
    <Modal
      title={`${alert ? 'Editar' : 'Criar'} Alert`}
      size="2xl"
      onClose={onClose}
      {...props}
    >
      <AlertForm
        defaultValues={alert}
        onSubmit={handleSubmit}
        isSubmitting={isCreatingAlert || isUpdatingAlert}
      />
    </Modal>
  );
}
