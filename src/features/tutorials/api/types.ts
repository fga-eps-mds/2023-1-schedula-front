export interface Tutorial {
  id: string;
  name: string;
}

export interface PostCreateTutorialParams {
  name: string;
}

export interface PostCreateTutorialResponse {
  id: string;
  name: string;
}

export interface PutUpdateTutorialParams {
  tutorialId: string;
  data: {
    name: string;
  };
}

export interface PutUpdateTutorialResponse {
  id: string;
  name: string;
}

export interface DeleteTutorialParams {
  tutorialId: string;
}
