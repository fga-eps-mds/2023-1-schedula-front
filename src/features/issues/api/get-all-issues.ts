import { useQuery } from '@tanstack/react-query';

import { toast } from 'utils/toast';
import { api } from '@/config/lib/axios';

import { ISSUES_CACHE_KEYS } from '@/features/issues/constants/cache';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import { Issue } from '@/features/issues/types';

type GetAllIssuesResponse = Array<Issue>;

const getAllIssues = async () =>
  api
    .get<GetAllIssuesResponse>(`${ISSUES_ENDPOINT}/issues`)
    .then((response) => response.data)
    .catch(() => {
      toast.error(
        'Não foi possível carregar os chamados. Tente novamente mais tarde!'
      );
      return [] as GetAllIssuesResponse;
    });

export const useGetAllCities = () =>
  useQuery([ISSUES_CACHE_KEYS.allIssues], getAllIssues);
