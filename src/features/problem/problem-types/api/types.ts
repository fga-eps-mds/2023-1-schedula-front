export interface PostCreateProblemTypeParams {
  name: string;
  problem_category_id: string;
  issues_ids?: string[];
}

export interface PostCreateProblemTypeResponse {
  id: string;
  name: string;
  description: string;
}

export interface PutUpdateProblemTypeParams {
  id: string;
  data: {
    name: string;
    problem_category_id: string;
    issues_ids?: string[];
  };
}

export interface PutUpdateProblemTypeResponse {
  id: string;
  name: string;
  description: string;
}

export interface DeleteProblemTypeParams {
  id: string;
}
