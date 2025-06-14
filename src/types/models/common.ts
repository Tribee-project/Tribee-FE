export type Status = 0 | 1; // 0: 활성, 1: 비활성

export interface BaseEntity {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface FlightData {
  departureTime: string;
  arrivalTime: string;
  timeTaken: string;
}
