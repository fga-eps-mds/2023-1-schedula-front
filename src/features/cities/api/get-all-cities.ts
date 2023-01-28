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

const getCity = async (cityId: string) =>
  api
    .get<City>(`${CITIES_ENDPOINT}/cities/${cityId}`)
    .then((response) => response.data)
    .catch(() => {
      toast.error(
        'Não foi possível carregar a cidade. Tente novamente mais tarde!'
      );
      return null;
    });

export const useGetAllCities = () =>
  useQuery([CITIES_CACHE_KEYS.allCities], getAllCities);

export const useGetCity = (cityId: string) =>
  useQuery([CITIES_CACHE_KEYS.city], () => getCity(cityId));
