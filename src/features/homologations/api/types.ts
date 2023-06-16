import { Issue } from '@/features/issues/types';

export type GetAllIssuesResponse = Array<Issue>;

export interface DeleteIssuesParams {
  id: string;
}

export interface PutEditIssuesParams {
  id: string;
  data: {
    requester: string;
    phone: string;
    city_id: string;
    workstation_id: string;
    email: string;
    date: string;
    problem_category: {
      id: string;
      name: string;
      description: string;
      problem_types: ProblemTypeOption[];
    };
    problem_types: ProblemTypeOption[];
  };
}
