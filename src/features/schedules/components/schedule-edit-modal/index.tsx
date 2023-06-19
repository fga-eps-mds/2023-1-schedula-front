import { ModalProps } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Modal } from '@/components/modal';
import { Schedule, ScheduleStatus } from '@/features/schedules/types';
import { ScheduleEditForm } from '@/features/schedules/components/schedule-edit-form';
import { usePutEditSchedule } from '@/features/schedules/api/put-edit-schedule';

interface ScheduleEditModalProps extends Partial<ModalProps> {
  schedule?: Schedule;
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleEditModal({
  schedule,
  onClose,
  ...props
}: ScheduleEditModalProps) {
  const { mutate: editSchedule, isLoading: isEdittingSchedule } =
    usePutEditSchedule({
      onSuccessCallBack: () => onClose(),
    });

  const handleSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (values: any) => {
      const { description, status, dateTime } = schedule ?? {};
      const alerts =
      values.alert_dates?.map((alert: { date: string }) => alert.date) || [];
      
      const defaultStatus = status
      ? Object.keys(ScheduleStatus)[
        Object.values(ScheduleStatus).indexOf(status)
      ]
      : 'PROGRESS';
      
      const data = {
        id: schedule?.id ?? '',
        data: {
          issue_id: schedule?.issue.id ?? '',
          description: values.description ?? description,
          status_e: values.status_e.value ?? defaultStatus,
          dateTime: values.date_time ?? dateTime,
          alerts,
        },
      }

      editSchedule(data);
    },
    [editSchedule, schedule]
  );

  return (
    <Modal title="Editar agendamento" onClose={onClose} {...props}>
      <ScheduleEditForm
        schedule={schedule}
        onSubmit={handleSubmit}
        isSubmitting={isEdittingSchedule}
      />
    </Modal>
  );
}
