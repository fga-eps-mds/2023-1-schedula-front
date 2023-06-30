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

export interface ExternIssue {
  id: string;
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: Date;
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

export interface IssueOpen {
  id: string;
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: string | Date;
  dateTime: Date;
  alerts: Date[];
  cellphone: string;
  description: string;
  problem_category: {
    id: string;
    name: string;
    description: string;
    problem_types: ProblemTypeOption[];
  };
  problem_types: ProblemTypeOption[];
  isHomolog?: boolean;
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

export interface PostCreateIssueResponseOpen {
  id: string;
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  dateTime: Date;
  alerts: Date[];
  date: Date;
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

export interface PostSendMailIssueParamsOpen {
  targetMail: string;
  justify: string;
}

export interface PostSendMailIssueResponseOpen {
  targetMail: string;
  justify: string;
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

export interface PutUpdateIssueParamsOpen {
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

export interface PostCreateIssueParamsOpen {
  requester: string;
  cellphone: string;
  email: string;
  phone: string;
  alerts?: Date[];
  dateTime?: Date;
  city_id: string;
  workstation_id: string;
  date: Date;
  problem_category_id: string;
  problem_types_ids: string[];
  description: string;
}

export interface IssuePayloadOpen {
  issueId: string;
  date: Date;
  requester: string;
  cellphone: string;
  alerts: Date[];
  dateTime: Date;
  email: string;
  phone: string;
  city_payload: { label: string; value: string };
  workstation_payload: { label: string; value: string };
  problem_category_payload: { label: string; value: string };
  problem_types_payload: { label: string; value: string }[];
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
