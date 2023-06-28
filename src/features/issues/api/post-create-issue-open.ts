import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import {
  PostCreateIssueParamsOpen,
  PostCreateIssueResponseOpen,
} from '@/features/issues/types';
import { ISSUES_CACHE_KEYS } from '@/features/issues/constants/cache';
import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';

function postCreateIssue(data: PostCreateIssueParamsOpen) {
  return api
    .post<PostCreateIssueResponseOpen>(`${ISSUES_ENDPOINT}/issuesOpen`, data)
    .then((response) => response.data);
}

export function usePostCreateIssueOpen({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: (data: PostCreateIssueResponseOpen) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(postCreateIssue, {
    onSuccess(data: PostCreateIssueResponseOpen) {
      queryClient.invalidateQueries([ISSUES_CACHE_KEYS.allIssues]);

      toast.success('Agendamento Externo criado com sucesso!');

      onSuccessCallBack?.(data);
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar criar um agendamento externo.'
      );
    },
  });
}
