import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';
import { TUTORIAL_ENDPOINT } from '@/features/tutorials/constants/requests';
import { toast } from '@/utils/toast';
import { TUTORIALS_CACHE_KEYS } from '@/features/tutorials/constants/cache';
import {
  DeleteTutorialParams,
  DeleteTutorialsParams,
} from '@/features/tutorials/api/types';

function deleteTutorial({ tutorialId }: DeleteTutorialParams) {
  return api.delete<boolean>(`${TUTORIAL_ENDPOINT}/tutorials/${tutorialId}`);
}

function deleteTutorials({ tutorialsIds }: DeleteTutorialsParams) {
  return api.delete<boolean>(
    `${TUTORIAL_ENDPOINT}/tutorials/delete-tutorials/${tutorialsIds}`
  );
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

export function useDeleteTutorials() {
  const queryClient = useQueryClient();

  return useMutation(deleteTutorials, {
    onSuccess() {
      toast.success('Tutoriais removidos com sucesso!');

      queryClient.invalidateQueries([TUTORIALS_CACHE_KEYS.allTutorials]);
    },
    onError() {
      toast.error(
        'Não foi possível remover os tutoriais. Tente novamente mais tarde!'
      );
    },
  });
}
