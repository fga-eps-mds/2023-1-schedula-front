export interface PostCreateProblemTypeParams {
  name: string;
  visible_user_external: boolean;
  problem_category_id: string;
  issues_ids?: string[];
}

export interface PostCreateProblemTypeResponse {
  id: string;
  name: string;
  visible_user_external: boolean;
  description: string;
}

export interface PutUpdateProblemTypeParams {
  id: string;
  data: {
    name: string;
    visible_user_external: boolean;
    problem_category_id: string;
    issues_ids?: string[];
  };
}

export interface PutUpdateProblemTypeResponse {
  id: string;
  name: string;
  visible_user_external: boolean;
  description: string;
}

export interface DeleteProblemTypeParams {
  id: string;
}
