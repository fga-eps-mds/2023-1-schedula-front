import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';
import { ALERTS_ENDPOINT } from '@/constants/requests';
import { toast } from '@/utils/toast';
import { API_STATUS_CACHE_KEYS } from '@/features/api-status/constants/cache';

const getAlertsApiStatus = async () =>
  api
    .get<boolean>(ALERTS_ENDPOINT)
    .then((response) => response.data)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);

      toast.error('O Serviço de alertas está fora do ar', 'Indisponível!');

      return false;
    });

export const useGetAlertsApiStatus = () =>
  useQuery([API_STATUS_CACHE_KEYS.alertsStatus], getAlertsApiStatus, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
