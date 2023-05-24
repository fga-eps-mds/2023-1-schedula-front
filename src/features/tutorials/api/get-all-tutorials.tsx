import { useQuery } from '@tanstack/react-query';

import { toast } from 'utils/toast';
import { api } from '@/config/lib/axios';

import { TUTORIALS_CACHE_KEYS } from '@/features/tutorials/constants/cache';
import { TUTORIAL_ENDPOINT } from '@/features/tutorials/constants/requests';
import { Tutorial } from '@/features/tutorials/api/types';

export type GetAllTutorialsResponse = Array<Tutorial>;

export const getAllTutorials = async () =>
  api
    .get<GetAllTutorialsResponse>(`${TUTORIAL_ENDPOINT}/tutorials`)
    .then((response) => response.data)
    .catch((err) => {
      const errMessage =
        err?.response?.data?.message ??
        'Não foi possível carregar os tutoriais. Tente novamente mais tarde!';
      toast.error(errMessage);
      return [] as GetAllTutorialsResponse;
    });

const getTutorial = async (tutorialId: string) =>
  api
    .get<Tutorial>(`${TUTORIAL_ENDPOINT}/tutorials/${tutorialId}`)
    .then((response) => response.data)
    .catch(() => {
      toast.error(
        'Não foi possível carregar o tutorial. Tente novamente mais tarde!'
      );
      return null;
    });

export const useGetallTutorials = () =>
  useQuery([TUTORIALS_CACHE_KEYS.allTutorials], getAllTutorials);

export const useGetTutorial = (tutorialId: string) =>
  useQuery([TUTORIALS_CACHE_KEYS.tutorial], () => getTutorial(tutorialId));
