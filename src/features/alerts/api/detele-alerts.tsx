import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';
import { ALERT_ENDPOINT } from '@/features/alerts/constants/requests';
import { toast } from '@/utils/toast';
import { ALERTS_CACHE_KEYS } from '@/features/alerts/constants/cache';
import {
  DeleteAlertParams,
  DeleteAlertsParams,
} from '@/features/alerts/api/types';

function deleteAlert({ alertId }: DeleteAlertParams) {
  return api.delete<boolean>(`${ALERT_ENDPOINT}/alerts/${alertId}`);
}

function deleteAlerts({ alertsIds }: DeleteAlertsParams) {
  return api.delete<boolean>(
    `${ALERT_ENDPOINT}/alerts/delete-alerts/${alertsIds}`
  );
}

export function useDeleteAlert() {
  const queryClient = useQueryClient();

  return useMutation(deleteAlert, {
    onSuccess() {
      toast.success('Alerta removido com sucesso!');

      queryClient.invalidateQueries([ALERTS_CACHE_KEYS.allAlerts]);
    },
    onError() {
      toast.error(
        'Não foi possível remover o alerta. Tente novamente mais tarde!'
      );
    },
  });
}

export function useDeleteAlerts() {
  const queryClient = useQueryClient();

  return useMutation(deleteAlerts, {
    onSuccess() {
      toast.success('Alerta removidos com sucesso!');

      queryClient.invalidateQueries([ALERTS_CACHE_KEYS.allAlerts]);
    },
    onError() {
      toast.error(
        'Não foi possível remover os alerta. Tente novamente mais tarde!'
      );
    },
  });
}
