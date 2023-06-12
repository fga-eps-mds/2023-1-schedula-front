import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';
import { ISSUES_CACHE_KEYS } from '@/features/issues/constants/cache';
import { PutEditIssuesParams } from '@/features/homologations/api/types';

async function putEditExternIssues({ id, data }: PutEditIssuesParams) {
  const response = await api.put<boolean>(
    `${ISSUES_ENDPOINT}/issuesOpen/${id}`,
    data
  );
  return response.data;
}

export function usePutEditExternIssues({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(putEditExternIssues, {
    onSuccess() {
      queryClient.invalidateQueries([ISSUES_CACHE_KEYS.allIssues]);
      queryClient.invalidateQueries([ISSUES_CACHE_KEYS.allIssues]);

      toast.success('Agendamento atualizado com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar atualizar o agendamento.'
      );
    },
  });
}
