import { useQuery } from '@tanstack/react-query';

import { toast } from 'utils/toast';
import { api } from '@/config/lib/axios';

import { Notification } from '@/features/notifications/api/types';
import { ALERTS_ENDPOINT } from '@/constants/requests';
import { NOTIFICATIONS_CACHE_KEYS } from '@/features/notifications/constants/cache';

export type GetAllNotificationsResponse = Array<Notification>;

export const getAllNotifications = async () =>
  api
    .get<GetAllNotificationsResponse>(`${ALERTS_ENDPOINT}/alerts`)
    .then((response) => response.data)
    .catch((err) => {
      const errMessage =
        err?.response?.data?.message ??
        'Não foi possível carregar as notificações. Tente novamente mais tarde!';
      toast.error(errMessage);
      return [] as GetAllNotificationsResponse;
    });

const getNotification = async (notificationId: string) =>
  api
    .get<Notification>(`${ALERTS_ENDPOINT}/alerts/${notificationId}`)
    .then((response) => response.data)
    .catch(() => {
      toast.error(
        'Não foi possível carregar a notificação. Tente novamente mais tarde!'
      );
      return null;
    });

export const useGetAllNotification = () =>
  useQuery([NOTIFICATIONS_CACHE_KEYS.allNotifications], getAllNotifications);

export const useGetNotification = (notificationId: string) =>
  useQuery([NOTIFICATIONS_CACHE_KEYS.notification], () =>
    getNotification(notificationId)
  );
