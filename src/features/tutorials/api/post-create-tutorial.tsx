import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { TUTORIAL_ENDPOINT } from '@/features/tutorials/constants/requests';
import {
  PostCreateTutorialParams,
  PostCreateTutorialResponse,
} from '@/features/tutorials/api/types';
import { TUTORIALS_CACHE_KEYS } from '@/features/tutorials/constants/cache';
import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';

function postCreateTutorial(data: PostCreateTutorialParams) {
  return api.post<PostCreateTutorialResponse>(
    `${TUTORIAL_ENDPOINT}/cities`,
    data
  );
}

export function usePostCreateTutorial({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(postCreateTutorial, {
    onSuccess() {
      queryClient.invalidateQueries([TUTORIALS_CACHE_KEYS.allTutorials]);

      toast.success('Cidade criada com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar criar a cidade.'
      );
    },
  });
}
