import { useCallback } from 'react';
import { ModalProps } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/modal';
import { Issue } from '@/features/issues/types';
import { usePostCreateSchedule } from '@/features/issues/api/post-create-schedule';
import { ScheduleForm } from '@/features/schedules/components/schedule-form';

interface ScheduleModalProps extends Partial<ModalProps> {
  issue?: Issue;
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleModal({
  issue,
  onClose,
  ...props
}: ScheduleModalProps) {
  const navigate = useNavigate();

  const { mutate: createSchedule, isLoading: isCreatingSchedule } =
    usePostCreateSchedule({
      onSuccessCallBack: () => navigate('/agendamentos'),
    });

  const handleSubmit = useCallback(
    ({ alert_dates, description, event_date }: ChamadoEvent) => {
      const alerts = alert_dates?.map((alert) => alert.date) || [];

      createSchedule({
        alerts: alerts ?? [],
        dateTime: event_date ?? new Date(),
        description: description ?? '',
        issue_id: issue?.id ?? '',
        status_e: 'NOT_RESOLVED',
      });
    },
    [createSchedule, issue?.id]
  );

  return (
    <Modal title="Criar agendamento" onClose={onClose} {...props}>
      <ScheduleForm
        issue={issue}
        onSubmit={handleSubmit}
        isSubmitting={isCreatingSchedule}
      />
    </Modal>
  );
}
