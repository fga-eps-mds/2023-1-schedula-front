import { useQuery } from '@tanstack/react-query';

import { toast } from 'utils/toast';
import { api } from '@/config/lib/axios';

import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import { GetAllSchedulesResponse } from '@/features/schedules/api/types';
import { SCHEDULE_CACHE_KEYS } from '@/features/schedules/constants/cache';

const getAllSchedulesOpen = async () =>
  api
    .get<GetAllSchedulesResponse>(`${ISSUES_ENDPOINT}/schedules-open`)
    .then((response) => response.data)
    .catch(() => {
      toast.error(
        'Não foi possível carregar os agendamentos. Tente novamente mais tarde!'
      );
      return {} as GetAllSchedulesResponse;
    });

export const useGetAllSchedulesOpen = () =>
  useQuery([SCHEDULE_CACHE_KEYS.allSchedulesOpen], getAllSchedulesOpen);

const getAllSchedules = async () =>
  api
    .get<GetAllSchedulesResponse>(`${ISSUES_ENDPOINT}/schedules`)
    .then((response) => response.data)
    .catch(() => {
      toast.error(
        'Não foi possível carregar os agendamentos. Tente novamente mais tarde!'
      );
      return {} as GetAllSchedulesResponse;
    });

export const useGetAllSchedules = () =>
  useQuery([SCHEDULE_CACHE_KEYS.allSchedules], getAllSchedules);
