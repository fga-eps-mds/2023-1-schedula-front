import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import { NotificationForm } from '@/features/notifications/components/notification-pendency-form';

interface NotificationModalProps extends Partial<ModalProps> {
  isOpen: boolean;
  notificationIds: string | undefined;
  onClose: () => void;
  onClear: () => void;
  onDelete: () => void;
}

export function NotificationPendencyModal({
  onClose,
  onClear,
  onDelete,
  notificationIds,
  ...props
}: NotificationModalProps) {
  return (
    <Modal size="3xl" title="Adicionar Pendência" onClose={onClose} {...props}>
      <NotificationForm />
    </Modal>
  );
}
