import { useQuery } from '@tanstack/react-query';

import { toast } from 'utils/toast';
import { api } from '@/config/lib/axios';

import { CITIES_CACHE_KEYS } from '@/features/cities/constants/cache';
import { CITIES_ENDPOINT } from '@/features/cities/constants/requests';
import { City } from '@/features/cities/api/types';

type GetAllCitiesResponse = Array<City>;

const getAllCities = async () =>
  api
    .get<GetAllCitiesResponse>(`${CITIES_ENDPOINT}/cities`)
    .then((response) => response.data)
    .catch((err) => {
      const errMessage =
        err?.response?.data?.message ??
        'Não foi possível carregar as cidades. Tente novamente mais tarde!';
      toast.error(errMessage);
      return [] as GetAllCitiesResponse;
    });

export const useGetAllCities = () =>
  useQuery([CITIES_CACHE_KEYS.allCities], getAllCities);
