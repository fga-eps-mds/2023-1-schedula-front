import { ModalProps } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Modal } from '@/components/modal';
import { NotificationForm } from '@/features/notifications/components/notification-pendency-form';
import { usePutUpdateNotifications } from '../../api/put-update-notifications';
import { NotificationPayLoad, Notification } from '../../types';
import { NotificationSolvedForm } from '../notification-solved-form';

interface NotificationModalProps extends Partial<ModalProps> {
  isOpen: boolean;
  notification?: Notification | undefined;
  notificationStatus: 'pending' | 'solved';
  onClose: () => void;
}

export function NotificationPendencyModal({
  onClose,
  notification,
  notificationStatus,
  ...props
}: NotificationModalProps) {
  const { mutate: updateNotification, isLoading: isUpdatingNotification } =
    usePutUpdateNotifications({
      onSuccessCallBack: onClose,
    });

  const handleSubmit = useCallback(
    async ({ pendency }: NotificationPayLoad) => {
      const status = notificationStatus === 'pending' ? 'pending' : 'solved';
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
    [updateNotification, notification?.id, notificationStatus]
  );

  const renderConfirmation = () => {
    if (notificationStatus === 'pending') {
      return (
        <NotificationForm
          defaultValues={notification}
          onSubmit={handleSubmit}
          isSubmitting={isUpdatingNotification}
        />
      );
    }
    return (
      <NotificationSolvedForm
        defaultValues={notification}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    );
  };

  return (
    <Modal
      size="3xl"
      title={
        notificationStatus === 'pending'
          ? 'Adicionar pendência'
          : 'Marcar como resolvido'
      }
      onClose={onClose}
      {...props}
    >
      {renderConfirmation()}
    </Modal>
  );
}
