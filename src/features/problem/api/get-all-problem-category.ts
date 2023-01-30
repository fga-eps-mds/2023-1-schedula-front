import { useQuery } from '@tanstack/react-query';
import { toast } from 'utils/toast';
import { api } from '@/config/lib/axios';
import { ProblemCategory } from '@/features/problem/api/types';
import { PROBLEM_CATEGORIES_ENDPOINT } from '@/features/problem/constants/requests';
import { PROBLEM_CATEGORIES_CACHE_KEYS } from '@/features/problem/constants/cache';

type GetAllProblemCategoriesResponse = Array<ProblemCategory>;

export const getAllProblemCategories = async () =>
  api
    .get<GetAllProblemCategoriesResponse>(
      `${PROBLEM_CATEGORIES_ENDPOINT}/problem-category`
    )
    .then((response) => response.data)
    .catch(() => {
      toast.error(
        'Não foi possível carregar os tipos de problemas. Tente novamente mais tarde'
      );
      return [] as GetAllProblemCategoriesResponse;
    });

export const useGetAllProblemCategories = () =>
  useQuery(
    [PROBLEM_CATEGORIES_CACHE_KEYS.allProblemCategories],
    getAllProblemCategories
  );
