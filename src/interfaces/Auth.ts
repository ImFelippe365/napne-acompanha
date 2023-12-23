import { User } from "./User";

export interface Credentials {
  registration: string;
  password: string;
}

export interface AuthenticationResponse {
  access_token: string;
  token_type: string;
  user: User;
}
