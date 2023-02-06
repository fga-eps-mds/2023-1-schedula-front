export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  position: string;
  profile: 'ADMIN' | 'BASIC' | 'USER';
  createdAt: string;
  updatedAt: string;
}

export interface GetUserInfoResponse {
  username: string;
  email: string;
  userId: string;
  profile: 'ADMIN' | 'BASIC' | 'USER';
}

export interface PostCreateUserParams {
  email: string;
  name: string;
  username: string;
  position: string;
  profile: string;
  password: string;
}

export interface PostCreateUserResponse {
  user: {
    email: string;
    name: string;
    username: string;
    position: string;
    profile: string;
    confirmationToken: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}

export interface PutUpdateUserParams {
  userId: string;
  data: {
    email: string;
    name: string;
    username: string;
    position: string;
    profile: string;
    password: string;
  };
}

export interface PutUpdateUserResponse {
  id: string;
  email: string;
  name: string;
  username: string;
  position: string;
  profile: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeleteRemoveUserParams {
  userId: string;
}
