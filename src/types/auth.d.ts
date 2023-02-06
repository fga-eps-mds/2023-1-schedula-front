type SignInCredentials = {
  username: string;
  password: string;
};

type SignedUser = {
  id: string;
  name: string;
  token: string;
  email: string;
  role: 'ADMIN' | 'BASIC' | 'USER';
  // permissions: Array<string>;
};

type AuthResponse = {
  token: string;
};
