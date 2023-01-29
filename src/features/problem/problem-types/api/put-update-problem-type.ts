import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';

import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';
import { PROBLEM_CATEGORIES_CACHE_KEYS } from '@/features/problem/constants/cache';
import { PROBLEM_TYPES_ENDPOINT } from '@/features/problem/constants/requests';
import {
  PutUpdateProblemTypeParams,
  PutUpdateProblemTypeResponse,
} from '@/features/problem/problem-types/api/types';

function putUpdateProblemType({ id, data }: PutUpdateProblemTypeParams) {
  return api.put<PutUpdateProblemTypeResponse>(
    `${PROBLEM_TYPES_ENDPOINT}/problem-types/${id}`,
    data
  );
}

export function usePutUpdateProblemType({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(putUpdateProblemType, {
    onSuccess() {
      queryClient.invalidateQueries([
        PROBLEM_CATEGORIES_CACHE_KEYS.singleProblemCategory,
      ]);

      toast.success('Tipo de problema atualizado com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar atualizar o tipo de problema.'
      );
    },
  });
}
