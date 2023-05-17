export interface Tutorial {
  id: string;
  name: string;
  filename: string;
  data: any;
  category: string;
}

export interface TutorialPayload {
  name: string;
  file: any;
  category: string;
}
