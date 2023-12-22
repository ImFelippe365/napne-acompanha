export interface CourseData {
  id: string;
  name: string;
  byname: string;
  periodsQuantity: number;
  degree: string;
}

export interface CreateCourseData {
  name: string;
  byname: string;
  periodsQuantity: number;
  degree: string;
}