import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { PutUpdateTutorialParams, PutUpdateTutorialResponse } from './types';
import { toast } from '@/utils/toast';
import { TUTORIALS_CACHE_KEYS } from '../constants/cache';
import { ApiError } from '@/config/lib/axios/types';
import { TUTORIAL_ENDPOINT } from '@/features/tutorials/constants/requests';

function putUpdateTutorial({ tutorialId, data }: PutUpdateTutorialParams) {
  const form = new FormData();
  form.append('name', data.name);
  form.append('category_id', data.category_id.value);
  form.append('file', data.file[0]);

  return api.put<PutUpdateTutorialResponse>(
    `${TUTORIAL_ENDPOINT}/tutorials/${tutorialId}`,
    form
  );
}

export function usePutUpdateTutorial({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(putUpdateTutorial, {
    onSuccess() {
      queryClient.invalidateQueries([TUTORIALS_CACHE_KEYS.allTutorials]);

      toast.success('Tutorial atualizado com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar editar o tutorial.'
      );
    },
  });
}
