import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import { DeleteAlertForm } from '../alert-delete-form';

interface AlertModalProps extends Partial<ModalProps> {
  isOpen: boolean;
  alertsIds: string[];
  onClose: () => void;
  onClear: () => void;
  onDelete: () => void;
}

export function DeleteAlertModal({
  onClose,
  onClear,
  onDelete,
  alertsIds,
  ...props
}: AlertModalProps) {
  return (
    <Modal size="2xl" title="Atenção" onClose={onClose} {...props}>
      <DeleteAlertForm
        alertsIds={alertsIds}
        onClose={onClose}
        onClear={onClear}
        onDelete={onDelete}
      />
    </Modal>
  );
}
