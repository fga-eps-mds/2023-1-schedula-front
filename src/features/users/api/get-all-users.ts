import { useQuery } from '@tanstack/react-query';

import { toast } from 'utils/toast';
import { api } from '@/config/lib/axios';

import { USERS_CACHE_KEYS } from '@/features/users/constants/cache';
import { User } from '@/features/users/api/types';
import { USERS_ENDPOINT } from '@/constants/requests';

export type GetAllUsersResponse = Array<User>;

export const getAllUsers = async () =>
  api
    .get<GetAllUsersResponse>(`${USERS_ENDPOINT}/users`)
    .then((response) => response.data)
    .catch(() => {
      toast.error(
        'Não foi possível carregar os usuários. Tente novamente mais tarde!'
      );
      return [] as GetAllUsersResponse;
    });

export const useGetAllUsers = () =>
  useQuery([USERS_CACHE_KEYS.allUsers], getAllUsers);
