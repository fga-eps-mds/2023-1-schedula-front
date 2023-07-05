import { HStack, useDisclosure, Button } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';
import {
  useGetAllSchedules,
  useGetAllSchedulesOpen,
} from '@/features/schedules/api/get-all-schedules';
import { ListView } from '@/components/list';
import {
  Schedule,
  ScheduleStatus,
  ScheduleOpen,
} from '@/features/schedules/types';
import { ScheduleItem } from '@/features/schedules/components/schedule-item';
import { useDeleteSchedule } from '@/features/schedules/api/delete-schedule';
import { ScheduleEditModal } from '@/features/schedules/components/schedule-edit-modal';

export function AgendamentosAbertos() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scheduleToEdit, setScheduleToEdit] = useState<
    ScheduleOpen | Schedule
  >();

  const {
    refetch: refetchSchedulesOpen,
    data: schedulesOpen,
    isLoading: isLoadingSchedulesOpen,
  } = useGetAllSchedulesOpen();
  const {
    refetch: refetchSchedules,
    data: schedules,
    isLoading: isLoadingSchedules,
  } = useGetAllSchedules();

  const isLoading = isLoadingSchedulesOpen || isLoadingSchedules;

  const refetch = useCallback(async () => {
    refetchSchedulesOpen();
    refetchSchedules();
  }, [refetchSchedulesOpen, refetchSchedules]);

  const allSchedules =
    schedules && schedulesOpen ? [...schedules, ...schedulesOpen] : [];

  const filteredSchedules = allSchedules?.filter(
    (schedule) => schedule.status !== ('RESOLVIDO' as ScheduleStatus)
  );

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
    (schedule: ScheduleOpen | Schedule) => (
      <ScheduleItem
        schedule={schedule}
        onEdit={onEdit}
        onDelete={onDelete}
        isDeleting={isDeletingSchedule}
      />
    ),
    [onEdit, onDelete, isDeletingSchedule]
  );

  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Agendamentos Abertos">
        <HStack spacing={2}>
          <RefreshButton refresh={refetch} />
          <Button
            variant="primary"
            onClick={() => navigate('/agendamento_externo')}
          >
            Novo Agendamento
          </Button>
        </HStack>
      </PageHeader>

      <ListView<Schedule | ScheduleOpen>
        items={
          filteredSchedules && filteredSchedules.length > 0
            ? filteredSchedules
            : undefined
        }
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
