export interface Tutorial {
  title: any;
  category: any;
  categoria: string;
  id: string;
  name: string;
  state: string;
}

export interface PostCreateTutorialParams {
  name: string;
  state: string;
}

export interface PostCreateTutorialResponse {
  id: string;
  name: string;
  state: string;
}

export interface PutUpdateTutorialParams {
  tutorialId: string;
  data: {
    name: string;
    state: string;
  };
}

export interface PutUpdateTutorialResponse {
  id: string;
  name: string;
  state: string;
}

export interface DeleteTutorialParams {
  tutorialId: string;
}
