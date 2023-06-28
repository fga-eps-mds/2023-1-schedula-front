import { useQuery } from '@tanstack/react-query';

import { toast } from 'utils/toast';
import { api } from '@/config/lib/axios';

import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import { GetAllSchedulesResponse } from '@/features/schedules/api/types';
import { SCHEDULE_CACHE_KEYS } from '@/features/schedules/constants/cache';

const getAllSchedules = async () => {
  const schedulesPromise = api.get<GetAllSchedulesResponse>(
    `${ISSUES_ENDPOINT}/schedules`
  );
  const openSchedulesPromise = api.get<GetAllSchedulesResponse>(
    `${ISSUES_ENDPOINT}/schedules-open`
  );

  try {
    const [schedulesResponse, openSchedulesResponse] = await Promise.all([
      schedulesPromise,
      openSchedulesPromise,
    ]);

    const schedules = schedulesResponse.data;
    const openSchedules = openSchedulesResponse.data;

    const combinedSchedules = schedules.concat(openSchedules);

    return combinedSchedules;
  } catch (error) {
    toast.error(
      'Não foi possível carregar os agendamentos. Tente novamente mais tarde!'
    );
    return [];
  }
};

export const useGetAllSchedules = () =>
  useQuery([SCHEDULE_CACHE_KEYS.allSchedules], getAllSchedules);
