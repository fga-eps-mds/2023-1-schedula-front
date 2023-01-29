import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';

import { toast } from '@/utils/toast';

import { ApiError } from '@/config/lib/axios/types';
import {
  PutUpdateProblemCategoriesParams,
  PutUpdateProblemCategoriesResponse,
} from '@/features/problem/api/types';
import { PROBLEM_CATEGORIES_ENDPOINT } from '@/features/problem/constants/requests';
import { PROBLEM_CATEGORIES_CACHE_KEYS } from '@/features/problem/constants/cache';

function PutUpdateProblemCategory({
  id,
  data,
}: PutUpdateProblemCategoriesParams) {
  return api.put<PutUpdateProblemCategoriesResponse>(
    `${PROBLEM_CATEGORIES_ENDPOINT}/problem-category/${id}`,
    data
  );
}

export function usePutUpdateProblemCategory({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(PutUpdateProblemCategory, {
    onSuccess() {
      queryClient.invalidateQueries([
        PROBLEM_CATEGORIES_CACHE_KEYS.allProblemCategories,
      ]);

      toast.success('Categoria de problema atualizada com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar editar a categoria de problema.'
      );
    },
  });
}
