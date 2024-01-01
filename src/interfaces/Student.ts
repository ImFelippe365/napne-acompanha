import { ClassData } from "./Class";
import { Grade } from "./Grade";
import { User } from "./User";

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
  picture?: string | undefined | any;
  classId: string;
}

export interface StudentGrade {
  id: string;
  name: string;
  referencePeriod: number;
  code: string;
  isOptative: boolean;
  courseId: string;
  course: null;
  grades: Grade[];
}

export interface StudentNote {
  id: string;
  title: string;
  description: string;
  studentId: string;
  createdBy: string;
  createdAt: string;
  user: User;
}

export interface CreateStudentNote {
  title: string;
  description: string;
}
