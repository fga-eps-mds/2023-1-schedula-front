import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import {
  PostCreateScheduleParams,
  PostCreateScheduleResponse,
} from '@/features/issues/types';
import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';
import { SCHEDULE_CACHE_KEYS } from '@/features/schedules/constants/cache';

async function postCreateSchedule(data: PostCreateScheduleParams) {
  const response = await api.post<PostCreateScheduleResponse>(
    `${ISSUES_ENDPOINT}/schedules`,
    data
  );
  return response.data;
}

export function usePostCreateSchedule({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(postCreateSchedule, {
    onSuccess() {
      queryClient.invalidateQueries([SCHEDULE_CACHE_KEYS.allSchedules]);

      toast.success('Agendamento criado com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar criar o agendamento.'
      );
    },
  });
}
