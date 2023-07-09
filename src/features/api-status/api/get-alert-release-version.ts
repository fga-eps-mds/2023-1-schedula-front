import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';
import { Release } from '@/features/api-status/types';
import { API_STATUS_CACHE_KEYS } from '@/features/api-status/constants/cache';

const GITHUB_ALERTS_SERVICE_RELEASE_URL =
  'https://api.github.com/repos/fga-eps-mds/2023-1-schedula-gestor-de-alerta/releases';

const getAlertsServiceReleaseVersion = async () =>
  api
    .get<Release>(GITHUB_ALERTS_SERVICE_RELEASE_URL)
    .then((response) => response.data)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);

      return {} as Release;
    });

export const useGetAlertsServiceReleaseVersion = () =>
  useQuery(
    [API_STATUS_CACHE_KEYS.alertsServiceReleaseVersions],
    getAlertsServiceReleaseVersion,
    {
      enabled: !!import.meta.env.PROD,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );
