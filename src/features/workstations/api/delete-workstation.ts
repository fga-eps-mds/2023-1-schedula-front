import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { WORKSTATIONS_ENDPOINT } from '@/features/workstations/constants/requests';
import { toast } from '@/utils/toast';
import { WORKSTATIONS_CACHE_KEYS } from '@/features/workstations/constants/cache';
import { DeleteWorkstationParams } from '@/features/workstations/api/types';
import { ApiError } from '@/config/lib/axios/types';

function deleteWorkstation({ workId, data }: DeleteWorkstationParams) {
  return api.post<string>(
    `${WORKSTATIONS_ENDPOINT}/workstations/${workId}`,
    data
  );
}

export function useDeleteWorkstation({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(deleteWorkstation, {
    onSuccess() {
      toast.success('Posto de trabalho removido com sucesso!');

      queryClient.invalidateQueries([WORKSTATIONS_CACHE_KEYS.allWorkstations]);

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
