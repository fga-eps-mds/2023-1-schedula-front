import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';
import { TUTORIAL_ENDPOINT } from '@/features/tutorials/constants/requests';
import { toast } from '@/utils/toast';
import { TUTORIALS_CACHE_KEYS } from '@/features/tutorials/constants/cache';
import { DeleteTutorialParams } from '@/features/tutorials/api/types';

function deleteTutorial({ tutorialId }: DeleteTutorialParams) {
  return api.delete<boolean>(`${TUTORIAL_ENDPOINT}/cities/${tutorialId}`);
}

export function useDeleteTutorial() {
  const queryClient = useQueryClient();

  return useMutation(deleteTutorial, {
    onSuccess() {
      toast.success('Cidade removida com sucesso!');

      queryClient.invalidateQueries([TUTORIALS_CACHE_KEYS.allTutorials]);
    },
    onError() {
      toast.error(
        'Não foi possível remover a cidade. Tente novamente mais tarde!'
      );
    },
  });
}
