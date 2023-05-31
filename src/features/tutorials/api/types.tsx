export interface Tutorial {
  id: string;
  name: string;
  filename: string;
  data: any;
  category: {
    id: string;
    name: string;
  };
}

export interface PostCreateTutorialParams {
  name: string;
  file: any;
  category_id: {
    value: string;
  };
}

export interface PostCreateTutorialResponse {
  id: string;
  name: string;
  filename: string;
  data: any;
  category: {
    id: string;
    name: string;
  };
}

export interface PutUpdateTutorialParams {
  tutorialId: string;
  data: {
    name: string;
    file?: any;
    category_id: {
      value: string;
    };
  };
}

export interface PutUpdateTutorialResponse {
  id: string;
  name: string;
  filename: string;
  data: any;
  category: {
    id: string;
    name: string;
  };
}

export interface DeleteTutorialParams {
  tutorialId: string;
}

export interface DeleteTutorialsParams {
  tutorialsIds: string[];
}
