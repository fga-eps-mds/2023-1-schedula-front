import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';

import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';
import { PROBLEM_CATEGORIES_CACHE_KEYS } from '@/features/problem/constants/cache';
import {
  PostCreateProblemTypeParams,
  PostCreateProblemTypeResponse,
} from '@/features/problem/problem-types/api/types';
import { PROBLEM_TYPES_ENDPOINT } from '@/features/problem/constants/requests';

function postCreateProblemType(data: PostCreateProblemTypeParams) {
  return api.post<PostCreateProblemTypeResponse>(
    `${PROBLEM_TYPES_ENDPOINT}/problem-types`,
    data
  );
}

export function usePostCreateProblemType({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(postCreateProblemType, {
    onSuccess() {
      queryClient.invalidateQueries([
        PROBLEM_CATEGORIES_CACHE_KEYS.singleProblemCategory,
      ]);

      toast.success('Tipo de problema criado com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar criar o tipo de problema.'
      );
    },
  });
}
