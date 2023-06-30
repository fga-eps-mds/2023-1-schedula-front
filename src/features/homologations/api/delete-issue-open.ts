import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';
import { toast } from '@/utils/toast';
import { DeleteIssuesParams } from '@/features/homologations/api/types';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import { ISSUES_CACHE_KEYS } from '@/features/issues/constants/cache';

function deleteIssues({ id }: DeleteIssuesParams) {
  return api.delete<boolean>(`${ISSUES_ENDPOINT}/issuesOpen/${id}`);
}

export function useDeleteHomologation() {
  const queryClient = useQueryClient();

  return useMutation(deleteIssues, {
    onSuccess() {
      toast.success('Agendamento removido com sucesso!');

      queryClient.invalidateQueries([ISSUES_CACHE_KEYS.allIssues]);
    },
    onError() {
      toast.error(
        'Não foi possível remover o agendamento. Tente novamente mais tarde!'
      );
    },
  });
}
