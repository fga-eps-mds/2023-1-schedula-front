export interface ProblemTypeOption {
  id: string;
  name: string;
}

export interface Issue {
  id: string;
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: Date;
  problem_category: {
    id: string;
    name: string;
    description: string;
    problem_types: ProblemTypeOption[];
  };
  problem_types: ProblemTypeOption[];
}

export interface PostCreateIssueParams {
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: Date;
  problem_category_id: string;
  problem_types_ids: string[];
}

export interface PostCreateIssueResponse {
  id: string;
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: Date;
  problem_category: {
    id: string;
    name: string;
    description: string;
    problem_types: ProblemTypeOption[];
  };
  problem_types: ProblemTypeOption[];
}

export interface PutUpdateIssueParams {
  issueId: string;
  data: {
    requester: string;
    phone: string;
    city_id: string;
    workstation_id: string;
    email: string;
    date: Date;
    problem_category_id: string;
    problem_types_ids: string[];
  };
}

export interface PutUpdateIssueResponse {
  id: string;
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: Date;
  problem_category: {
    id: string;
    name: string;
    description: string;
    problem_types: ProblemTypeOption[];
  };
  problem_types: ProblemTypeOption[];
}

export interface DeleteIssueParams {
  issueId: string;
}

export interface IssuePayload {
  issueId: string;
  requester: string;
  phone: string;
  city_payload: { label: string; value: string };
  workstation_payload: { label: string; value: string };
  email: string;
  date: Date;
  problem_category_payload: { label: string; value: string };
  problem_types_payload: { label: string; value: string }[];
}
