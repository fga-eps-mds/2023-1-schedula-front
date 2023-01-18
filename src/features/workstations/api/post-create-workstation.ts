import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { WORKSTATIONS_ENDPOINT } from '@/features/workstations/constants/requests';
import {
  PostCreateWorkstationParams,
  PostCreateWorkstationResponse,
} from '@/features/workstations/api/types';
import { WORKSTATIONS_CACHE_KEYS } from '@/features/workstations/constants/cache';
import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';

function createWorkstation(data: PostCreateWorkstationParams) {
  return api.post<PostCreateWorkstationResponse>(
    `${WORKSTATIONS_ENDPOINT}/workstations`,
    data
  );
}

export function usePostCreateWorkstation({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(createWorkstation, {
    onSuccess() {
      queryClient.invalidateQueries([WORKSTATIONS_CACHE_KEYS.allWorkstations]);

      toast.success('Posto de trabalho criado com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar criar um posto de trabalho.'
      );
    },
  });
}
