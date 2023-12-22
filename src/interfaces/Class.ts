export interface ClassData {
  id: string;
  referencePeriod: number;
  shift: string;
  courseId: string;
  diaryId: string;
}

export interface CreateClassData {
  referencePeriod: number;
  shift: string;
  courseId: string;
  diaryId: string;
}