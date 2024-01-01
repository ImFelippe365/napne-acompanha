export type Department = "TEACHER" | "ADMINISTRATOR";

export interface User {
  id: string;
  name: string;
  department: Department;
  picture: string | undefined;
  registration: string;
}
