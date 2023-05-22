import { useQuery } from '@tanstack/react-query';

import { toast } from 'utils/toast';
import { api } from '@/config/lib/axios';

import { TUTORIALS_CACHE_KEYS } from '@/features/tutorials/constants/cache';
import { TUTORIALS_ENDPOINT } from '@/features/tutorials/constants/requests';
import { Tutorial } from '@/features/tutorials/api/types';

export type GetAllTutorialsResponse = Array<Tutorial>;

// Aguardandoapi de tutoriais para trocar o endereço do ENDPOINT

export const getAllTutorials = async () =>
  api
    .get<GetAllTutorialsResponse>(`${TUTORIALS_ENDPOINT}/tutorials`)
    .then((response) => response.data)
    .catch((err) => {
      const errMessage =
        err?.response?.data?.message ??
        'Não foi possível carregar os tutorial. Tente novamente mais tarde!';
      toast.error(errMessage);
      return [] as GetAllTutorialsResponse;
    });

const getTutorial = async (tutorialId: string) =>
  api
    .get<Tutorial>(`${TUTORIALS_ENDPOINT}/tutorials/${tutorialId}`)
    .then((response) => response.data)
    .catch(() => {
      toast.error(
        'Não foi possível carregar o tutorial. Tente novamente mais tarde!'
      );
      return null;
    });

export const useGetAllTutorials = () =>
  useQuery([TUTORIALS_CACHE_KEYS.allTutorials], getAllTutorials);

export const useGetTutorial = (tutorialId: string) =>
  useQuery([TUTORIALS_CACHE_KEYS.tutorial], () => getTutorial(tutorialId));
