interface Category {
  id: string;
  description: string;
  name: string;
  visible_user_external: boolean;
}

interface CategoryPayload {
  name: string;
  description: string;
  visible_user_external: boolean;
}
