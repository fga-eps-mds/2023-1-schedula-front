export interface Tutorial {
  id: string;
  name: string;
  filename: string;
  data: {
    type: string;
    data: any;
  };
  category: {
    id: string;
    name: string;
  };
}
