import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';
import { SCHEDULE_CACHE_KEYS } from '@/features/schedules/constants/cache';
import { PutEditScheduleParams } from '@/features/schedules/api/types';

async function putEditSchedule({ id, data }: PutEditScheduleParams) {
  const response = await api.put<boolean>(
    `${ISSUES_ENDPOINT}/schedules/${id}`,
    data
  );
  return response.data;
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
