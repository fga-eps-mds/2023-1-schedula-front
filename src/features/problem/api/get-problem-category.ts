import { useQuery } from '@tanstack/react-query';
import { toast } from 'utils/toast';
import { api } from '@/config/lib/axios';
import {
  GetProblemCategoryParams,
  GetProblemCategoryResponse,
} from '@/features/problem/api/types';
import { PROBLEM_CATEGORIES_ENDPOINT } from '@/features/problem/constants/requests';
import { PROBLEM_CATEGORIES_CACHE_KEYS } from '@/features/problem/constants/cache';

const getProblemCategory = async ({ categoryId }: GetProblemCategoryParams) =>
  api
    .get<GetProblemCategoryResponse>(
      `${PROBLEM_CATEGORIES_ENDPOINT}/problem-category/${categoryId}`
    )
    .then((response) => response.data)
    .catch(() => {
      toast.error(
        'Não foi possível carregar os tipos de problemas. Tente novamente mais tarde'
      );
      return {} as GetProblemCategoryResponse;
    });

export const useGetProblemCategory = ({
  categoryId,
}: {
  categoryId?: string;
}) =>
  useQuery(
    [PROBLEM_CATEGORIES_CACHE_KEYS.singleProblemCategory, categoryId],
    () => getProblemCategory({ categoryId: categoryId ?? '' }),
    {
      enabled: !!categoryId,
    }
  );
