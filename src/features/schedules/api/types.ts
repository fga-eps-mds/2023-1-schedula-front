import { Schedule } from '@/features/schedules/types';

export type GetAllSchedulesResponse = Array<Schedule>;

export interface DeleteScheduleParams {
  id: string;
}

export interface PutEditScheduleParams {
  id: string;
  data: {
    description: string;
    status_e: string;
    issue_id: string;
    dateTime: string;
    alerts: Array<string>;
  };
}
