export interface ProblemTypeOption {
  id: string;
  name: string;
  visible_user_external: boolean;
}

export interface ProblemCategory {
  id: string;
  name: string;
  description: string;
  visible_user_external: boolean;
  problem_types: ProblemTypeOption[];
}

export interface PostCreateProblemCategoryParams {
  name: string;
  description: string;
  visible_user_external: boolean;
  problem_types_ids?: string[];
}

export interface PostCreateProblemCategoryResponse {
  id: string;
  name: string;
  description: string;
  visible_user_external: boolean;
  problem_types: ProblemTypeOption[];
}

export interface PutUpdateProblemCategoriesParams {
  id: string;
  data: {
    name: string;
    description: string;
    visible_user_external: boolean;
    problem_types_ids?: string[];
  };
}

export interface PutUpdateProblemCategoriesResponse {
  id: string;
  name: string;
  description: string;
  visible_user_external: boolean;
  problem_types: ProblemTypeOption[];
}

export interface DeleteProblemCategoryParams {
  id: string;
}

export interface GetProblemCategoryParams {
  categoryId: string;
}

export interface GetProblemCategoryResponse {
  id: string;
  name: string;
  description: string;
  visible_user_external: boolean;
  problem_types: [];
}
