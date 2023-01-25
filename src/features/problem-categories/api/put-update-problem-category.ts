import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { PROBLEM_CATEGORIES_ENDPOINT } from '@/features/problem-categories/constants/requests';
import {
  PutUpdateProblemCategoriesParams,
  PutUpdateProblemCategoriesResponse,
} from '@/features/problem-categories/api/types';
import { toast } from '@/utils/toast';
import { PROBLEM_CATEGORIES_CACHE_KEYS } from '@/features/problem-categories/constants/cache';
import { ApiError } from '@/config/lib/axios/types';

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
