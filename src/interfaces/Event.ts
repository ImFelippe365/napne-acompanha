import { StudentData } from "./Student";

export interface EventData {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  startTime: string;
  endTime: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

export interface EventParticipations {
  id: string;
  eventId: string;
  studentId: string;
  student: StudentData;
}