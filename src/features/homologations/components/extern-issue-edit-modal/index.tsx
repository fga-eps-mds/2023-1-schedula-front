import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Schedule,
  ScheduleStatus,
  ScheduleOpen,
} from '@/features/schedules/types';
import { ScheduleEditForm } from '@/features/schedules/components/schedule-edit-form';
import { usePutEditSchedule } from '@/features/schedules/api/put-edit-schedule';

interface ScheduleEditModalProps {
  schedule?: ScheduleOpen;
  onClose: () => void;
}

export function ScheduleEditModal({
  schedule,
  onClose,
}: ScheduleEditModalProps) {
  const history = useHistory();

  const { mutate: editSchedule, isLoading: isEditingSchedule } =
    usePutEditSchedule({
      onSuccessCallBack: () => {
        onClose();
        history.push('/homologacao/editar');
      },
    });

  const handleSubmit = useCallback(
    (values: any) => {
      const { description, status, dateTime } = schedule ?? {};
      const alerts =
        values.alert_dates?.map((alert: { date: string }) => alert.date) || [];

      const defaultStatus = status
        ? Object.keys(ScheduleStatus)[
            Object.values(ScheduleStatus).indexOf(status)
          ]
        : 'PROGRESS';

      editSchedule({
        id: schedule?.id ?? '',
        data: {
          issue_id: schedule?.issue.id ?? '',
          description: values.description ?? description,
          status_e: values.status_e.value ?? defaultStatus,
          dateTime: values.date_time ?? dateTime,
          alerts,
        },
      });
    },
    [editSchedule, schedule]
  );

  return (
    <div>
      <ScheduleEditForm
        schedule={schedule}
        onSubmit={handleSubmit}
        isSubmitting={isEditingSchedule}
      />
    </div>
  );
}
