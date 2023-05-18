export interface CategoryTutorial {
  id: string;
  name: string;
}

export interface PostCreateCategoryTutorialParams {
  name: string;
}

export interface PostCreateCategoryTutorialResponse {
  id: string;
  name: string;
}

export interface PutUpdateCategoryTutorialParams {
  categoryTutorialId: string;
  data: {
    name: string;
  };
}

export interface PutUpdateCategoryTutorialResponse {
  id: string;
  name: string;
}

export interface DeleteCategoryTutorialParams {
  categoryTutorialId: string;
}
