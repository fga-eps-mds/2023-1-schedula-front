import { Button, Grid } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { NotificationPayLoad } from '../../types';
import { Notification } from '../../api/types';

interface NotificationFormProps {
  defaultValues?: Notification;
  onSubmit: (data: NotificationPayLoad) => void;
  isSubmitting: boolean;
  onClose: () => void;
}

export function NotificationSolvedForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  onClose,
}: NotificationFormProps) {
  const { register, handleSubmit } = useForm<NotificationPayLoad>({
    defaultValues: {
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p style={{ fontWeight: 'bold', textAlign: 'center' }}>
        Tem certeza que deseja marcar esta notificação como resolvida?
      </p>
      <p style={{ textAlign: 'center', fontStyle: 'italic' }}>
        ATENÇÃO - Essa ação não poderá ser desfeita.
      </p>

      <Grid templateColumns="1fr 0fr" style={{ paddingTop: 20 }}>
        <Button width="45%" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" width="45%">
          Confirmar
        </Button>
      </Grid>
    </form>
  );
}
