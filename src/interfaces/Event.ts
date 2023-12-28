export interface EventData {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}