import { ClassData } from "./Class";

export interface StudentData {
  id: string;
  name: string;
  registration: string;
  dateOfBirth?: string;
  picture: string | undefined;
  classId: string;
  schoolClass: ClassData;
  shift: string | undefined;
}

export interface CreateStudentData {
  name: string;
  registration: string;
  dateOfBirth: string;
  picture?: string | undefined;
  classId: string;
}
