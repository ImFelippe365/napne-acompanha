import { CourseData } from './Course';
import { DiaryData } from './Diary';
export interface ClassData {
  id: string;
  referencePeriod: number;
  shift: Shift;
  courseId: string;
  course: CourseData;
  diaryId: string;
  diary: DiaryData;
}

export interface CreateClassData {
  referencePeriod: number;
  shift: string;
  courseId: string;
  diaryId: string;
}

export type Shift  = "MORNING" | "AFTERNOON" | "NIGHT"