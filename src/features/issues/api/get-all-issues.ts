import { useQuery } from '@tanstack/react-query';

import { toast } from 'utils/toast';
import { api } from '@/config/lib/axios';

import { ISSUES_CACHE_KEYS } from '@/features/issues/constants/cache';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import { Issue, IssueOpen } from '@/features/issues/types';

type GetAllIssuesOpenResponse = Array<IssueOpen>;

const getAllIssuesOpen = async () =>
  api
    .get<GetAllIssuesOpenResponse>(`${ISSUES_ENDPOINT}/issuesOpen`)
    .then((response) => response.data)
    .catch(() => {
      toast.error(
        'Não foi possível carregar os chamados. Tente novamente mais tarde!'
      );
      return [] as GetAllIssuesOpenResponse;
    });

export const useGetAllIssuesOpen = () =>
  useQuery([ISSUES_CACHE_KEYS.allIssuesOpen], getAllIssuesOpen);

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

export const useGetAllIssues = () =>
  useQuery([ISSUES_CACHE_KEYS.allIssues], getAllIssues);
