import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteIssueParams } from '@/features/issues/api/types';
import { api } from '@/config/lib/axios';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import { toast } from '@/utils/toast';
import { ISSUES_CACHE_KEYS } from '@/features/issues/constants/cache';

function deleteIssue({ issueId }: DeleteIssueParams) {
  return api.delete<boolean>(`${ISSUES_ENDPOINT}/issues/${issueId}`);
}

export function useDeleteIssue() {
  const queryClient = useQueryClient();

  return useMutation(deleteIssue, {
    onSuccess() {
      toast.success('Atendimento removido com sucesso!');

      queryClient.invalidateQueries([ISSUES_CACHE_KEYS.allIssues]);
    },
    onError() {
      toast.error(
        'Não foi possível remover o atendimento. Tente novamente mais tarde!'
      );
    },
  });
}
