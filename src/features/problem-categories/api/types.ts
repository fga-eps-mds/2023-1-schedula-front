export interface ProblemType {
  id: string;
  name: string;
}

export interface ProblemCategory {
  id: string;
  name: string;
  description: string;
  problem_types: ProblemType[];
}

export interface PostCreateProblemCategoryParams {
  name: string;
  description: string;
  problem_types_ids: string[];
}

export interface PostCreateProblemCategoryResponse {
  id: string;
  name: string;
  description: string;
  problem_types: ProblemType[];
}

export interface PutUpdateProblemCategoriesParams {
  id: string;
  data: {
    name: string;
    description: string;
    problem_types_ids: string[];
  };
}

export interface PutUpdateProblemCategoriesResponse {
  id: string;
  name: string;
  description: string;
  problem_types: ProblemType[];
}

export interface DeleteProblemCategoryParams {
  id: string;
}
