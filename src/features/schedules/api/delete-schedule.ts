import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';
import { toast } from '@/utils/toast';
import { DeleteScheduleParams } from '@/features/schedules/api/types';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import { SCHEDULE_CACHE_KEYS } from '@/features/schedules/constants/cache';

async function deleteSchedule({ id }: DeleteScheduleParams) {
  try {
    // Verifica se a issue está em /schedules
    await api.delete<boolean>(`${ISSUES_ENDPOINT}/schedules/${id}`);
  } catch (error: string | any) {
    if (error.response?.status === 404) {
      // Se a issue não estiver em /schedules, procura em /schedules-open
      await api.delete<boolean>(`${ISSUES_ENDPOINT}/schedules-open/${id}`);
    } else {
      throw error; // Lança um erro caso ocorra um erro diferente de 404
    }
  }
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
