export interface ProblemType {
  id: string;
  name: string;
  description: string;
  category_id: number;
  active: boolean;
  updated_at: Date;
}

export interface ProblemTypePayload {
  name: string;
}
