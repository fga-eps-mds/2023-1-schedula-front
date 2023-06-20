import { HStack, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';
import { useGetAllSchedules } from '@/features/schedules/api/get-all-schedules';
import { ListView } from '@/components/list';
import { Schedule } from '@/features/schedules/types';
import { ScheduleItem } from '@/features/schedules/components/schedule-item';
import { useDeleteSchedule } from '@/features/schedules/api/delete-schedule';
import { ScheduleEditModal } from '@/features/schedules/components/schedule-edit-modal';

export function Agendamentos() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scheduleToEdit, setScheduleToEdit] = useState<Schedule | undefined>();

  const { data: schedules, isLoading, refetch } = useGetAllSchedules();
  const filteredSchedules = schedules
    ? schedules.filter(
        (schedule) => schedule.status.toString().toUpperCase() !== 'RESOLVIDO'
      )
    : [];

  const { mutate: deleteSchedule, isLoading: isDeletingSchedule } =
    useDeleteSchedule();

  const onEdit = useCallback(
    (schedule: Schedule) => {
      setScheduleToEdit(schedule);
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(
    (id: string) => {
      deleteSchedule({ id });
    },
    [deleteSchedule]
  );

  const handleClose = useCallback(() => {
    setScheduleToEdit(undefined);
    onClose();
  }, [onClose]);

  const renderScheduleItem = useCallback(
    (schedule: Schedule) => (
      <ScheduleItem
        schedule={schedule}
        onEdit={onEdit}
        onDelete={onDelete}
        isDeleting={isDeletingSchedule}
      />
    ),
    [onEdit, onDelete, isDeletingSchedule]
  );

  return (
    <>
      <PageHeader title="Agendamentos">
        <HStack spacing={2}>
          <RefreshButton refresh={refetch} />
        </HStack>
      </PageHeader>

      <ListView<Schedule>
        items={filteredSchedules}
        render={renderScheduleItem}
        isLoading={isLoading}
      />

      <ScheduleEditModal
        isOpen={isOpen}
        onClose={handleClose}
        schedule={scheduleToEdit}
      />
    </>
  );
}
