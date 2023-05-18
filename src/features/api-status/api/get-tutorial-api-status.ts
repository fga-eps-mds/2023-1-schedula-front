import { useQuery } from '@tanstack/react-query';

import { api } from '@/config/lib/axios';

import { API_STATUS_CACHE_KEYS } from '@/features/api-status/constants/cache';
import { TUTORIALS_ENDPOINT } from '@/constants/requests';
import { toast } from '@/utils/toast';

const getTutorialsApiStatus = async () =>
  api
    .get<boolean>(TUTORIALS_ENDPOINT)
    .then((response) => response.data)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);

      toast.error('O Serviço de tutoriais está fora do ar', 'Indisponível!');

      return false;
    });

export const useGetTutorialsApiStatus = () =>
  useQuery([API_STATUS_CACHE_KEYS.tutorialsStatus], getTutorialsApiStatus, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
