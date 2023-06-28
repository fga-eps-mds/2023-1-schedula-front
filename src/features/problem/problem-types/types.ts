export interface ProblemType {
  id: string;
  name: string;
  visible_user_external: boolean;
  description: string;
  category_id: number;
  active: boolean;
  updated_at: Date;
}

export interface ProblemTypePayload {
  name: string;
  visible_user_external: boolean;
}
