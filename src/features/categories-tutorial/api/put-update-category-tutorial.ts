import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { CATEGORIES_TUTORIAL_ENDPOINT } from '@/features/categories-tutorial/constants/requests';
import {
  PutUpdateCategoryTutorialParams,
  PutUpdateCategoryTutorialResponse,
} from '@/features/categories-tutorial/api/types';
import { toast } from '@/utils/toast';
import { CATEGORIES_TUTORIAL_CACHE_KEYS } from '@/features/categories-tutorial/constants/cache';
import { ApiError } from '@/config/lib/axios/types';

function putUpdateCategoryTutorial({
  categoryTutorialId,
  data,
}: PutUpdateCategoryTutorialParams) {
  return api.put<PutUpdateCategoryTutorialResponse>(
    `${CATEGORIES_TUTORIAL_ENDPOINT}/categories/${categoryTutorialId}`,
    data
  );
}

export function usePutUpdateCategoryTutorial({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(putUpdateCategoryTutorial, {
    onSuccess() {
      queryClient.invalidateQueries([
        CATEGORIES_TUTORIAL_CACHE_KEYS.allCategoriesTutorial,
      ]);

      toast.success('Categoria atualizada com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar editar a categoria.'
      );
    },
  });
}
