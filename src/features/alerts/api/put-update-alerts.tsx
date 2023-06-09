import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { PutUpdateAlertParams, PutUpdateAlertResponse } from './types';
import { toast } from '@/utils/toast';
import { ALERTS_CACHE_KEYS } from '../constants/cache';
import { ApiError } from '@/config/lib/axios/types';
import { ALERT_ENDPOINT } from '@/features/alerts/constants/requests';

function putUpdateAlert({ alertId, data }: PutUpdateAlertParams) {
  const form = new FormData();
  form.append('name', data.name);
  form.append('category_id', data.category_id.value);
  form.append('file', data.file[0]);

  return api.put<PutUpdateAlertResponse>(
    `${ALERT_ENDPOINT}/alerts/${alertId}`,
    form
  );
}

export function usePutUpdateAlert({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(putUpdateAlert, {
    onSuccess() {
      queryClient.invalidateQueries([ALERTS_CACHE_KEYS.allAlerts]);

      toast.success('Alerta atualizado com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar editar o alerta.'
      );
    },
  });
}
