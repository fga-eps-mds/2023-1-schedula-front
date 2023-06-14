import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { ALERT_ENDPOINT } from '@/features/alerts/constants/requests';
import {
  PostCreateAlertParams,
  PostCreateAlertResponse,
} from '@/features/alerts/api/types';
import { ALERTS_CACHE_KEYS } from '@/features/alerts/constants/cache';
import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';

function postCreateAlert(data: PostCreateAlertParams) {

  return api.post<PostCreateAlertResponse>(`${ALERT_ENDPOINT}/alerts`, data);
}

export function usePostCreateAlert({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(postCreateAlert, {
    onSuccess() {
      queryClient.invalidateQueries([ALERTS_CACHE_KEYS.allAlerts]);

      toast.success('Alerta criado com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar criar o alerta.'
      );
    },
  });
}
