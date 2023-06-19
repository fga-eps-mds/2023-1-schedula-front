import { ModalProps } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Modal } from '@/components/modal';
import { NotificationForm } from '@/features/notifications/components/notification-pendency-form';
import { usePutUpdateNotifications } from '../../api/put-update-notifications';
import { NotificationPayLoad, Notification } from '../../types';

interface NotificationModalProps extends Partial<ModalProps> {
  isOpen: boolean;
  notification?: Notification | undefined;
  onClose: () => void;
  onClear: () => void;
  onDelete: () => void;
}

export function NotificationPendencyModal({
  onClose,
  notification,
  ...props
}: NotificationModalProps) {
  const { mutate: updateNotification, isLoading: isUpdatingNotification } =
    usePutUpdateNotifications({
      onSuccessCallBack: onClose,
    });

  const handleSubmit = useCallback(
    async ({ pendency }: NotificationPayLoad) => {
      const status = 'pending';
      const read = true;
      if (notification?.id) {
        updateNotification({
          notificationId: notification.id,
          data: {
            status,
            pendency,
            read,
          },
        });
      }
    },
    [updateNotification, notification?.id]
  );

  return (
    <Modal size="3xl" title="Adicionar Pendência" onClose={onClose} {...props}>
      <NotificationForm
        defaultValues={notification}
        onSubmit={handleSubmit}
        isSubmitting={isUpdatingNotification}
      />
    </Modal>
  );
}
