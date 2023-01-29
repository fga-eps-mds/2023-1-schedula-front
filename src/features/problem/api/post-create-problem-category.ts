import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';

import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';
import {
  PostCreateProblemCategoryParams,
  PostCreateProblemCategoryResponse,
} from '@/features/problem/api/types';
import { PROBLEM_CATEGORIES_ENDPOINT } from '@/features/problem/constants/requests';
import { PROBLEM_CATEGORIES_CACHE_KEYS } from '@/features/problem/constants/cache';

function postCreateProblemCategory(data: PostCreateProblemCategoryParams) {
  return api.post<PostCreateProblemCategoryResponse>(
    `${PROBLEM_CATEGORIES_ENDPOINT}/problem-category`,
    data
  );
}

export function usePostCreateProblemCategory({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(postCreateProblemCategory, {
    onSuccess() {
      queryClient.invalidateQueries([
        PROBLEM_CATEGORIES_CACHE_KEYS.allProblemCategories,
      ]);

      toast.success('Categoria de problema criada com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar criar a categoria de problema.'
      );
    },
  });
}
