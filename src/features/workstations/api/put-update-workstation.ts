import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { WORKSTATIONS_ENDPOINT } from '@/features/workstations/constants/requests';
import {
  PutUpdateWorkstationParams,
  PutUpdateWorkstationResponse,
} from '@/features/workstations/api/types';
import { toast } from '@/utils/toast';
import { WORKSTATIONS_CACHE_KEYS } from '@/features/workstations/constants/cache';
import { ApiError } from '@/config/lib/axios/types';

function updateWorkstation({
  workstationId,
  data,
}: PutUpdateWorkstationParams) {
  return api.put<PutUpdateWorkstationResponse>(
    `${WORKSTATIONS_ENDPOINT}/workstations/${workstationId}`,
    data
  );
}

export function usePutUpdateWorkstation({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(updateWorkstation, {
    onSuccess() {
      queryClient.invalidateQueries([WORKSTATIONS_CACHE_KEYS.allWorkstations]);

      toast.success('Posto de trabalho atualizado com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar editar o posto de trabalho.'
      );
    },
  });
}
