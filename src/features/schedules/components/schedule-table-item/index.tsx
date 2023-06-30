import { Checkbox, Td, Tr } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { Schedule, ScheduleOpen } from '@/features/schedules/types';
import { formatDate } from '@/utils/format-date';

interface ScheduleTableItemProps {
  schedule: Schedule | ScheduleOpen;
  selectedSchedules: (Schedule | ScheduleOpen)[];
  setSelectedSchedules: Dispatch<SetStateAction<(Schedule | ScheduleOpen)[]>>;
}

export function ScheduleTableItem({
  schedule,
  selectedSchedules,
  setSelectedSchedules,
}: ScheduleTableItemProps) {
  const isChecked = useMemo(() => {
    return selectedSchedules.findIndex((i) => i.id === schedule.id) !== -1;
  }, [schedule.id, selectedSchedules]);
  const currentStatus =
    schedule.status.charAt(0).toUpperCase() +
    schedule.status.slice(1).toLowerCase();

  const handleCheckToggle = useCallback(() => {
    if (isChecked) {
      return setSelectedSchedules((oldState) =>
        oldState.filter((i) => i.id !== schedule.id)
      );
    }

    setSelectedSchedules((oldState) => [...oldState, schedule]);
  }, [isChecked, schedule, setSelectedSchedules]);

  return (
    <Tr>
      <Td>
        <Checkbox
          style={{ borderColor: 'gray' }}
          colorScheme="orange"
          checked={isChecked}
          onChange={handleCheckToggle}
        />
      </Td>
      <Td>{currentStatus ?? ''}</Td>
      <Td>{schedule?.issue?.requester ?? ''}</Td>
      <Td>{formatDate(schedule?.dateTime ?? '')}</Td>
      <Td>{schedule?.issue?.phone ?? ''}</Td>
      <Td>{schedule?.description ?? ''}</Td>
    </Tr>
  );
}
