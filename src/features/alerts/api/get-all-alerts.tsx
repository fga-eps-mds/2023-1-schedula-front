import { useQuery } from '@tanstack/react-query';

import { toast } from 'utils/toast';
import { api } from '@/config/lib/axios';

import { ALERTS_CACHE_KEYS } from '@/features/alerts/constants/cache';
import { ALERT_ENDPOINT } from '@/features/alerts/constants/requests';
import { Alert } from '@/features/alerts/api/types';

export type GetAllAlertsResponse = Array<Alert>;

export const getAllAlerts = async () =>
  api
    .get<GetAllAlertsResponse>(`${ALERT_ENDPOINT}/alerts`)
    .then((response) => response.data)
    .catch((err) => {
      const errMessage =
        err?.response?.data?.message ??
        'Não foi possível carregar os alertas. Tente novamente mais tarde!';
      toast.error(errMessage);
      return [] as GetAllAlertsResponse;
    });

const getAlert = async (alertId: string) =>
  api
    .get<Alert>(`${ALERT_ENDPOINT}/alerts/${alertId}`)
    .then((response) => response.data)
    .catch(() => {
      toast.error(
        'Não foi possível carregar o alerta. Tente novamente mais tarde!'
      );
      return null;
    });

export const useGetallAlerts = () =>
  useQuery([ALERTS_CACHE_KEYS.allAlerts], getAllAlerts, {
    refetchInterval: 500,
  });

export const useGetAlert = (alertId: string) =>
  useQuery([ALERTS_CACHE_KEYS.alert], () => getAlert(alertId));
