import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { ALERTS_ENDPOINT } from '@/constants/requests';
import {
  PutUpdateNotificationsParams,
  PutUpdateNotificationsResponse,
} from '@/features/notifications/api/types';
import { NOTIFICATIONS_CACHE_KEYS } from '../constants/cache';
import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';

function putUpdateNotifications({
  notificationId,
  data,
}: PutUpdateNotificationsParams) {
  return api.put<PutUpdateNotificationsResponse>(
    `${ALERTS_ENDPOINT}/alerts/${notificationId}`,
    data
  );
}

export function usePutUpdateNotifications({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(putUpdateNotifications, {
    onSuccess() {
      queryClient.invalidateQueries([
        NOTIFICATIONS_CACHE_KEYS.allNotifications,
      ]);

      toast.success('Notificação atualizado com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar editar a notificação.'
      );
    },
  });
}
