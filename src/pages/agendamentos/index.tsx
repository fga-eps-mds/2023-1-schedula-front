import { HStack, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState, useEffect } from 'react';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';
import { useGetAllSchedulesOpen } from '@/features/schedules/api/get-all-schedules-open';
import { ListView } from '@/components/list';
import { ScheduleOpen, Schedule } from '@/features/schedules/types';
import { ScheduleItem } from '@/features/schedules/components/schedule-item';
import { useDeleteSchedule } from '@/features/schedules/api/delete-schedule';
import { ScheduleEditModal } from '@/features/schedules/components/schedule-edit-modal';
import { useGetAllIssues } from '@/features/homologations/api/get-all-extern-issues';

export function Agendamentos() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [scheduleToEdit, setScheduleToEdit] = useState<
    Schedule | ScheduleOpen
  >();

  const {
    data: openSchedules,
    isLoading: isLoadingOpenSchedules,
    refetch: refetchOpenSchedules,
  } = useGetAllSchedulesOpen();

  const { mutate: deleteSchedule, isLoading: isDeletingSchedule } =
    useDeleteSchedule();

  const onEdit = useCallback(
    (schedule: ScheduleOpen | Schedule) => {
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
    (schedule: ScheduleOpen | Schedule) => (
      <ScheduleItem
        schedule={schedule}
        onEdit={() => onEdit(schedule)}
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
          <RefreshButton refresh={refetchOpenSchedules} />
        </HStack>
      </PageHeader>

      <ListView<ScheduleOpen | Schedule>
        items={openSchedules}
        render={renderScheduleItem}
        isLoading={isLoadingOpenSchedules}
      />

      <ScheduleEditModal
        isOpen={isOpen}
        onClose={handleClose}
        schedule={scheduleToEdit}
      />
    </>
  );
}
