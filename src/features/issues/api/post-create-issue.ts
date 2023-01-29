import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import {
  PostCreateIssueParams,
  PostCreateIssueResponse,
} from '@/features/issues/types';
import { ISSUES_CACHE_KEYS } from '@/features/issues/constants/cache';
import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';

function postCreateIssue(data: PostCreateIssueParams) {
  return api.post<PostCreateIssueResponse>(`${ISSUES_ENDPOINT}/issues`, data);
}

export function usePostCreateIssue({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(postCreateIssue, {
    onSuccess() {
      queryClient.invalidateQueries([ISSUES_CACHE_KEYS.allIssues]);

      toast.success('Chamado criado com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar criar um chamado.'
      );
    },
  });
}
