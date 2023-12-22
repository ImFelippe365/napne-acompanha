export interface DisciplineData {
  id: string;
  name: string;
  referencePeriod: number;
  code: string;
  isOptative: boolean;
  courseId: string;
}

export interface CreateDisciplineData {
  name: string;
  referencePeriod: number;
  code: string;
  isOptative: boolean;
  courseId: string;
}