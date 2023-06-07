import { HStack, useDisclosure, Button } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';
import { useGetAllSchedules } from '@/features/schedules/api/get-all-schedules';
import { ListView } from '@/components/list';
import { Schedule } from '@/features/schedules/types';
import { ScheduleItem } from '@/features/schedules/components/schedule-item';
import { useDeleteSchedule } from '@/features/schedules/api/delete-schedule';
import { ScheduleEditModal } from '@/features/schedules/components/schedule-edit-modal';

export function AgendamentosAbertos() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scheduleToEdit, setScheduleToEdit] = useState<Schedule | undefined>();

  const { data: schedules, isLoading, refetch } = useGetAllSchedules();

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
      <PageHeader title="Agendamentos Abertos">
        <HStack spacing={2}>
          <RefreshButton refresh={refetch} />
          <Link to="/chamados/registrar">
            <Button variant="primary">Novo Agendamento</Button>
          </Link>
        </HStack>
      </PageHeader>

      <ListView<Schedule>
        items={schedules}
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
