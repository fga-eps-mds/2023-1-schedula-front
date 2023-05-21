interface IUser {
  id: string;
  email: string;
  username: string;
  name: string;

  position: string;
  profile: Access;

  confirmationToken?: string;
  recoverToken?: string;

  active?: boolean;
}

interface LoggedUser {
  id: string;
  username: string;
  name: string;
  job_role: string;
  access: strings;
}

interface RegisterUserPayload {
  username: string;
  email: string;
  name: string;
  position: string;
  profile: Access;
  password: string;
  cpf: string;
  confirmPassword: string;
}

interface CredentialUser {
  username: string;
  password: string;
}

interface CredentialUserPayload {
  username: string;
  password: string;
}
