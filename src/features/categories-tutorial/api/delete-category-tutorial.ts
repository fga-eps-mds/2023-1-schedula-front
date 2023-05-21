import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';
import { CATEGORIES_TUTORIAL_ENDPOINT } from '@/features/categories-tutorial/constants/requests';
import { toast } from '@/utils/toast';
import { CATEGORIES_TUTORIAL_CACHE_KEYS } from '@/features/categories-tutorial/constants/cache';
import { DeleteCategoryTutorialParams } from '@/features/categories-tutorial/api/types';

function deleteCategoryTutorial({
  categoryTutorialId,
}: DeleteCategoryTutorialParams) {
  return api.delete<boolean>(
    `${CATEGORIES_TUTORIAL_ENDPOINT}/categories/${categoryTutorialId}`
  );
}

export function useDeleteCategoryTutorial() {
  const queryClient = useQueryClient();

  return useMutation(deleteCategoryTutorial, {
    onSuccess() {
      toast.success('Categoria removida com sucesso!');
      queryClient.invalidateQueries([
        CATEGORIES_TUTORIAL_CACHE_KEYS.allCategoriesTutorial,
      ]);
    },
    onError() {
      toast.error(
        'Não foi possível remover a categoria. Tente novamente mais tarde!'
      );
    },
  });
}
