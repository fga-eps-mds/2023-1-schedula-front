import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import {
  PutUpdateIssueParams,
  PutUpdateIssueResponse,
} from '@/features/issues/types';
import { toast } from '@/utils/toast';
import { ISSUES_CACHE_KEYS } from '@/features/issues/constants/cache';
import { ApiError } from '@/config/lib/axios/types';

function putUpdateIssue({ issueId, data }: PutUpdateIssueParams) {
  return api.put<PutUpdateIssueResponse>(
    `${ISSUES_ENDPOINT}/issues/${issueId}`,
    data
  );
}

export function usePutUpdateIssue({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(putUpdateIssue, {
    onSuccess() {
      queryClient.invalidateQueries([ISSUES_CACHE_KEYS.allIssues]);

      toast.success('Chamado atualizado com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar editar o chamado.'
      );
    },
  });
}
