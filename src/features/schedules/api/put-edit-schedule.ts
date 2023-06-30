import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';
import { SCHEDULE_CACHE_KEYS } from '@/features/schedules/constants/cache';
import { PutEditScheduleParams } from '@/features/schedules/api/types';

async function putEditSchedule({ id, data }: PutEditScheduleParams) {
  try {
    const response = await api.put<boolean>(
      `${ISSUES_ENDPOINT}/schedules/${id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404 || error.response?.status === 500) {
      const response = await api.put<boolean>(
        `${ISSUES_ENDPOINT}/schedules-open/${id}`,
        data
      );
      return response.data;
    }
    throw error; // Lança um erro caso ocorra um erro diferente de 404 ou 500
  }
}

export function usePutEditSchedule({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(putEditSchedule, {
    onSuccess() {
      queryClient.invalidateQueries([SCHEDULE_CACHE_KEYS.allSchedules]);

      toast.success('Agendamento atualizado com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar atualizar o agendamento.'
      );
    },
  });
}
