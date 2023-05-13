import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';
import { TUTORIALS_ENDPOINT } from '@/features/tutorials/constants/requests';
import { toast } from '@/utils/toast';
import { TUTORIALS_CACHE_KEYS } from '@/features/tutorials/constants/cache';
import { DeleteTutorialParams } from '@/features/tutorials/api/types';

function deleteTutorial({ tutorialId }: DeleteTutorialParams) {
  return api.delete<boolean>(`${TUTORIALS_ENDPOINT}/tutorials/${tutorialId}`);
}

export function useDeleteTutorial() {
  const queryClient = useQueryClient();

  return useMutation(deleteTutorial, {
    onSuccess() {
      toast.success('Tutorial removido com sucesso!');

      queryClient.invalidateQueries([TUTORIALS_CACHE_KEYS.allTutorials]);
    },
    onError() {
      toast.error(
        'Não foi possível remover o tutorial. Tente novamente mais tarde!'
      );
    },
  });
}
