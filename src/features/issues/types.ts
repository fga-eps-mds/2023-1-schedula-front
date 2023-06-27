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
  date: string;
  problem_category: {
    id: string;
    name: string;
    description: string;
    problem_types: ProblemTypeOption[];
  };
  problem_types: ProblemTypeOption[];
}

export interface ExternIssue {
  id: string;
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: string;
  description: string;
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
  date: string;
  problem_category_id: string;
  problem_types_ids: string[];
}

export interface PostCreateExternIssueParams {
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: string;
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
  date: string;
  problem_category: {
    id: string;
    name: string;
    description: string;
    problem_types: ProblemTypeOption[];
  };
  problem_types: ProblemTypeOption[];
}

export interface PostCreateExternIssueResponse {
  id: string;
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: string;
  dateTime: Date;
  alerts: Date[];
  description: string;
  cellphone: string;
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
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: Date;
  problem_category_id: string;
  problem_types_ids: string[];
  cellphone: string;
  description: string;
}

export interface PutUpdateExternIssueParams {
  issueId: string;
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: Date;
  problem_category_id: string;
  problem_types_ids: string[];
  cellphone: string;
  description: string;
  dateTime: Date;
  alerts: Date[];
}

export interface PutUpdateExternIssueResponse {
  id: string;
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: Date;
  dateTime: Date;
  description: string;
  cellphone: string;
  alerts: Date[];
  problem_category: {
    id: string;
    name: string;
    description: string;
    problem_types: ProblemTypeOption[];
  };
  problem_types: ProblemTypeOption[];
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
  problem_category_payload: { label: string; value: string };
  problem_types_payload?: { label: string; value: string }[];
}

export interface ExternIssuePayload {
  issueId: string;
  requester: string;
  phone: string;
  city_payload: { label: string; value: string };
  workstation_payload: { label: string; value: string };
  problem_category_payload: { label: string; value: string };
  problem_types_payload?: { label: string; value: string }[];
  dateTime: Date;
  alerts: Date[];
  description: string;
  cellphone: string;
}

export interface IssueOpen {
  name: any;
  ExternIssuename: any;
  id: string;
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: string;
  cellphone: string;
  description: string;
  alerts: Date[];
  dateTime: Date;
  problem_category: {
    id: string;
    name: string;
    description: string;
    problem_types: ProblemTypeOption[];
  };
  problem_types: ProblemTypeOption[];
}

export interface PostCreateIssueParamsOpen {
  requester: string;
  cellphone: string;
  email: string;
  phone: string;
  alerts: Date[];
  dateTime: Date;
  city_id: string;
  workstation_id: string;
  date: string;
  problem_category_id: string;
  problem_types_ids: string[];
  description: string;
}

export interface PostCreateIssueResponseOpen {
  id: string;
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: string;
  cellphone: string;
  description: string;
  problem_category: {
    id: string;
    name: string;
    description: string;
    problem_types: ProblemTypeOption[];
  };
  problem_types: ProblemTypeOption[];
}

export interface IssuePayloadOpen {
  issueId: string;
  requester: string;
  cellphone: string;
  alerts: Date[];
  dateTime: Date;
  email: string;
  phone: { label: string; value: string };
  city_payload: { label: string; value: string };
  workstation_payload: { label: string; value: string };
  problem_category_payload: { label: string; value: string };
  problem_types_payload?: { label: string; value: string }[];
  description: string;
}

export interface PostCreateScheduleParams {
  alerts: Date[];
  description: string;
  dateTime: Date;
  issue_id: string;
  status_e: string;
}

export interface PostCreateScheduleResponse {
  id: string;
}

export interface PutEditExternIssueParams {
  id: string;
  data: {
    requester: string;
    phone: string;
    city_id: string;
    workstation_id: string;
    email: string;
    date: string;
    dateTime: Date;
    alerts: Date[];
    description: string;
    cellphone: string;
    problem_category: {
      id: string;
      name: string;
      description: string;
      problem_types: ProblemTypeOption[];
    };
    problem_types: ProblemTypeOption[];
  };
}
