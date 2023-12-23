export type Deparment = "TEACHER" | "ADMINISTRATOR";

export interface User {
  id: string;
  name: string;
  department: Deparment;
  picture: string | undefined;
  registration: string;
}
