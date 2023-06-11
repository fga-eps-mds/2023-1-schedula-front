import { Issue } from '@/features/issues/types';

export type GetAllIssuesResponse = Array<Issue>;

export interface DeleteIssuesParams {
  id: string;
}

/*
export interface PutEditIssuesParams {
  id: string;
  data: {
    description: string;
    status_e: string;
    issue_id: string;
    dateTime: string;
    alerts: Array<string>;
  };
}
*/
