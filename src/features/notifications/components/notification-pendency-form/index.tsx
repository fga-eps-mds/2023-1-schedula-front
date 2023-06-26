import { Button, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { NotificationPayLoad } from '../../types';
import { Notification } from '../../api/types';

interface NotificationFormProps {
  defaultValues?: Notification;
  onSubmit: (data: NotificationPayLoad) => void;
  isSubmitting: boolean;
}

export function NotificationForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: NotificationFormProps) {
  const { register, handleSubmit } = useForm<NotificationPayLoad>({
    defaultValues: {
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p style={{ fontSize: 20 }}>Mensagem: (opcional)</p>
      <Textarea
        {...register('pendency')}
        placeholder="Adicione uma pendência"
        size="lg"
        style={{ marginTop: 6, marginBottom: 15, height: 200, resize: 'none' }}
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
        <Button type="submit" size="lg" width="100%" isLoading={isSubmitting}>
          Adicionar
        </Button>
      </div>
    </form>
  );
}
