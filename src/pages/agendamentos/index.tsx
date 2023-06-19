import { HStack, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState, useEffect } from 'react';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';
import { useGetAllSchedulesOpenDois } from '@/features/schedules/api/get-all-schedules-open2';
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
    data: openSchedulesDois,
    isLoading: isLoadingOpenSchedulesDois,
    refetch: refetchOpenSchedulesDois,
  } = useGetAllSchedulesOpenDois();

  const { mutate: deleteSchedule, isLoading: isDeletingSchedule } =
    useDeleteSchedule();

  const onEdit = useCallback(
    (schedule: ScheduleOpen | Schedule) => {
      setScheduleToEdit(schedule);
      onOpen();
    },
    [onOpen]
  );

  // const externIssuesDois = externIssues?.filter(externIssue => externIssue.id)
  // const scheduledIssues = openSchedulesDois.map(openSchedulesDois => openSchedulesDois.issue.id)

  // console.log("scheduledIssues", scheduledIssues)
  // console.log("externIssuesDois", externIssuesDois)

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
          <RefreshButton refresh={refetchOpenSchedulesDois} />
        </HStack>
      </PageHeader>

      <ListView<ScheduleOpen | Schedule>
        items={openSchedulesDois}
        render={renderScheduleItem}
        isLoading={isLoadingOpenSchedulesDois}
      />

      <ScheduleEditModal
        isOpen={isOpen}
        onClose={handleClose}
        schedule={scheduleToEdit}
      />
    </>
  );
}
