import { useQuery } from '@tanstack/react-query';

import { toast } from 'utils/toast';
import { api } from '@/config/lib/axios';

import { ISSUES_CACHE_KEYS } from '@/features/issues/constants/cache';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import { Issue, IssueOpen } from '@/features/issues/types';

type GetAllIssuesResponse = Array<Issue | IssueOpen>;

const getAllIssues = async () => {
  const issuesPromise = api.get<GetAllIssuesResponse>(
    `${ISSUES_ENDPOINT}/issues`
  );
  const issuesOpenPromise = api.get<GetAllIssuesResponse>(
    `${ISSUES_ENDPOINT}/issuesOpen`
  );

  try {
    const [issuesResponse, issuesOpenResponse] = await Promise.all([
      issuesPromise,
      issuesOpenPromise,
    ]);

    const issues = issuesResponse.data;
    const issuesOpen = issuesOpenResponse.data;

    const combinedIssues = issues.concat(issuesOpen);

    return combinedIssues;
  } catch (error) {
    toast.error(
      'Não foi possível carregar os chamados. Tente novamente mais tarde!'
    );
    return [] as GetAllIssuesResponse;
  }
};

export const useGetAllIssues = () =>
  useQuery([ISSUES_CACHE_KEYS.allIssues], getAllIssues);
