import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';
import { toast } from '@/utils/toast';
import { DeleteProblemCategoryParams } from '@/features/problem-categories/api/types';
import { PROBLEM_CATEGORIES_ENDPOINT } from '../constants/requests';
import { PROBLEM_CATEGORIES_CACHE_KEYS } from '@/features/problem-categories/constants/cache';

function deleteProblemCategory({ id }: DeleteProblemCategoryParams) {
  return api.delete<boolean>(
    `${PROBLEM_CATEGORIES_ENDPOINT}/problem-category/${id}`
  );
}

export function useDeleteProblemCategory() {
  const queryClient = useQueryClient();

  return useMutation(deleteProblemCategory, {
    onSuccess() {
      toast.success('Categoria de problema removida com sucesso!');

      queryClient.invalidateQueries([
        PROBLEM_CATEGORIES_CACHE_KEYS.allProblemCategories,
      ]);
    },
    onError() {
      toast.error(
        'Não foi possível remover a categoria de problema. Tente novamente mais tarde!'
      );
    },
  });
}
