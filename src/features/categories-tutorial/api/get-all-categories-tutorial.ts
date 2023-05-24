import { useQuery } from '@tanstack/react-query';

import { toast } from 'utils/toast';
import { api } from '@/config/lib/axios';

import { CATEGORIES_TUTORIAL_CACHE_KEYS } from '@/features/categories-tutorial/constants/cache';
import { CATEGORIES_TUTORIAL_ENDPOINT } from '@/features/categories-tutorial/constants/requests';
import { CategoryTutorial } from '@/features/categories-tutorial/api/types';

export type GetAllCategoryTutorialResponse = Array<CategoryTutorial>;

export const getAllCategoryTutorial = async (count: number) =>
  api
    .get<GetAllCategoryTutorialResponse>(
      `${CATEGORIES_TUTORIAL_ENDPOINT}/categories`
    )
    .then((response) => response.data)
    .catch((err) => {
      const errMessage =
        err?.response?.data?.message ??
        'Não foi possível carregar as categorias. Tente novamente mais tarde!';
      if (count === 1) {
        toast.error(errMessage);
      }
      return [] as GetAllCategoryTutorialResponse;
    });

const getCategoryTutorial = async (categoryTutorialId: string) =>
  api
    .get<CategoryTutorial>(
      `${CATEGORIES_TUTORIAL_ENDPOINT}/categories/${categoryTutorialId}`
    )
    .then((response) => response.data)
    .catch(() => {
      toast.error(
        'Não foi possível carregar a categoria. Tente novamente mais tarde!'
      );
      return null;
    });

export const useGetAllCategoryTutorial = (count: number) =>
  useQuery([CATEGORIES_TUTORIAL_CACHE_KEYS.allCategoriesTutorial], () =>
    getAllCategoryTutorial(count)
  );

export const useGetCategoryTutorial = (categoryTutorialId: string) =>
  useQuery([CATEGORIES_TUTORIAL_CACHE_KEYS.categoryTutorial], () =>
    getCategoryTutorial(categoryTutorialId)
  );
