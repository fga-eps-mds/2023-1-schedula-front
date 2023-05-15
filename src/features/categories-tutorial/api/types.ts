export interface CategoryTutorial {
  id: string;
  name: string;
  state: string;
}

export interface PostCreateCategoryTutorialParams {
  name: string;
  state: string;
}

export interface PostCreateCategoryTutorialResponse {
  id: string;
  name: string;
  state: string;
}

export interface PutUpdateCategoryTutorialParams {
  categoryTutorialId: string;
  data: {
    name: string;
    state: string;
  };
}

export interface PutUpdateCategoryTutorialResponse {
  id: string;
  name: string;
  state: string;
}

export interface DeleteCategoryTutorialParams {
  categoryTutorialId: string;
}
