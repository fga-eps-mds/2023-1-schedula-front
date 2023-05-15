import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { CATEGORIES_TUTORIAL_ENDPOINT } from '@/features/categories-tutorial/constants/requests';
import {
  PostCreateCategoryTutorialParams,
  PostCreateCategoryTutorialResponse,
} from '@/features/categories-tutorial/api/types';
import { CATEGORIES_TUTORIAL_CACHE_KEYS } from '@/features/categories-tutorial/constants/cache';
import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';

function postCreateCategoryTutorial(data: PostCreateCategoryTutorialParams) {
  return api.post<PostCreateCategoryTutorialResponse>(
    `${CATEGORIES_TUTORIAL_ENDPOINT}/categories`,
    data
  );
}

export function usePostCreateCategoryTutorial({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(postCreateCategoryTutorial, {
    onSuccess() {
      queryClient.invalidateQueries([
        CATEGORIES_TUTORIAL_CACHE_KEYS.allCategoriesTutorial,
      ]);

      toast.success('Categoria criada com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar criar a categoria.'
      );
    },
  });
}
