export interface Tutorial {
  id?: string;
  name: string;
  filename?: string;
  data?: any;
  category: {
    id: string;
    name: string;
  };
}

export interface TutorialPayload {
  name: string;
  file: any;
  category_id: string;
}
