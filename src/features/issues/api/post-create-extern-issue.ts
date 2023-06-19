import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import {
  PostCreateExternIssueParams,
  PostCreateExternIssueResponse,
} from '@/features/issues/types';
import { ISSUES_CACHE_KEYS } from '@/features/issues/constants/cache';
import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';

function postCreateExternIssue(data: PostCreateExternIssueParams) {
  return api
    .post<PostCreateExternIssueResponse>(`${ISSUES_ENDPOINT}/issuesOpen`, data)
    .then((response) => response.data);
}

export function usePostCreateExternIssue({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: (data: PostCreateExternIssueResponse) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(postCreateExternIssue, {
    onSuccess(data: PostCreateExternIssueResponse) {
      queryClient.invalidateQueries([ISSUES_CACHE_KEYS.allIssues]);

      toast.success('Atendimento criado com sucesso!');

      onSuccessCallBack?.(data);
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar criar um atendimento.'
      );
    },
  });
}
