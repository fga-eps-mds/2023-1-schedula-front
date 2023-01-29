import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';
import { toast } from '@/utils/toast';
import { PROBLEM_TYPES_ENDPOINT } from '@/features/problem/constants/requests';
import { DeleteProblemTypeParams } from '@/features/problem/problem-types/api/types';
import { PROBLEM_CATEGORIES_CACHE_KEYS } from '@/features/problem/constants/cache';

function deleteProblemType({ id }: DeleteProblemTypeParams) {
  return api.delete<boolean>(`${PROBLEM_TYPES_ENDPOINT}/problem-types/${id}`);
}

export function useDeleteProblemType() {
  const queryClient = useQueryClient();

  return useMutation(deleteProblemType, {
    onSuccess() {
      toast.success('Tipo de problema removido com sucesso!');

      queryClient.invalidateQueries([
        PROBLEM_CATEGORIES_CACHE_KEYS.singleProblemCategory,
      ]);
    },
    onError() {
      toast.error(
        'Não foi possível remover o tipo de problema. Tente novamente mais tarde!'
      );
    },
  });
}
