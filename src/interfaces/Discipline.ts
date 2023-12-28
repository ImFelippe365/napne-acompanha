import { CourseData } from "./Course";

export interface DisciplineData {
  id: string;
  name: string;
  referencePeriod: number;
  code: string;
  isOptative: boolean;
  courseId: string;
  course: CourseData;
}

export interface CreateDisciplineData {
  name: string;
  referencePeriod: number;
  code: string;
  isOptative: boolean;
  courseId: string;
}