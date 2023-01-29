import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';
import { toast } from '@/utils/toast';
import { DeleteScheduleParams } from '@/features/schedules/api/types';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import { SCHEDULE_CACHE_KEYS } from '@/features/schedules/constants/cache';

function deleteSchedule({ id }: DeleteScheduleParams) {
  return api.delete<boolean>(`${ISSUES_ENDPOINT}/schedules/${id}`);
}

export function useDeleteSchedule() {
  const queryClient = useQueryClient();

  return useMutation(deleteSchedule, {
    onSuccess() {
      toast.success('Agendamento removido com sucesso!');

      queryClient.invalidateQueries([SCHEDULE_CACHE_KEYS.allSchedules]);
    },
    onError() {
      toast.error(
        'Não foi possível remover o agendamento. Tente novamente mais tarde!'
      );
    },
  });
}
