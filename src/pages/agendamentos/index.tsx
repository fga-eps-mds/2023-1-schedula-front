import { HStack, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState, useEffect } from 'react';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';
import {
  useGetAllSchedules,
  useGetAllSchedulesOpen,
} from '@/features/schedules/api/get-all-schedules';
import { ListView } from '@/components/list';
import { ScheduleOpen, Schedule } from '@/features/schedules/types';
import { ScheduleItem } from '@/features/schedules/components/schedule-item';
import { useDeleteSchedule } from '@/features/schedules/api/delete-schedule';
import { ScheduleEditModal } from '@/features/schedules/components/schedule-edit-modal';

export function Agendamentos() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [scheduleToEdit, setScheduleToEdit] = useState<
    Schedule | ScheduleOpen
  >();
  const {
    data: schedules,
    isLoading: isLoadingSchedules,
    refetch: refetchSchedules,
  } = useGetAllSchedules();
  const {
    data: schedulesOpen,
    isLoading: isLoadingSchedulesOpen,
    refetch: refetchSchedulesOpen,
  } = useGetAllSchedulesOpen();

  const isLoading = isLoadingSchedules || isLoadingSchedulesOpen;

  const refetch = useCallback(async () => {
    refetchSchedules();
    refetchSchedulesOpen();
  }, [refetchSchedules, refetchSchedulesOpen]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const allSchedules =
    schedules && schedulesOpen ? [...schedules, ...schedulesOpen] : [];

  const filteredSchedules = allSchedules
    ? allSchedules.filter(
        (schedule) => schedule.status.toString().toUpperCase() !== 'RESOLVIDO'
      )
    : [];

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
          <RefreshButton refresh={refetch} />
        </HStack>
      </PageHeader>

      <ListView<Schedule | ScheduleOpen>
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
