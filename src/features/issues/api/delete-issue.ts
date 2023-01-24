import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import { toast } from '@/utils/toast';
import { ISSUES_CACHE_KEYS } from '@/features/issues/constants/cache';
import { DeleteIssueParams } from '@/features/issues/types';

function deleteCity({ issueId }: DeleteIssueParams) {
  return api.delete<boolean>(`${ISSUES_ENDPOINT}/issues/${issueId}`);
}

export function useDeleteCity() {
  const queryClient = useQueryClient();

  return useMutation(deleteCity, {
    onSuccess() {
      toast.success('Chamado removido com sucesso!');

      queryClient.invalidateQueries([ISSUES_CACHE_KEYS.allIssues]);
    },
    onError() {
      toast.error(
        'Não foi possível remover o chamado. Tente novamente mais tarde!'
      );
    },
  });
}
