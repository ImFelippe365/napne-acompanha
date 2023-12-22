export interface DiaryData {
  id: string;
  referencePeriod: number;
  referenceYear: number;
  startDate: string;
  endDate: string;
}

export interface CreateDiaryData {
  referencePeriod: number;
  referenceYear: number;
  startDate: string;
  endDate: string;
}