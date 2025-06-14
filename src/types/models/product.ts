import { BaseEntity, FlightData, Status } from './common';

export interface Product extends BaseEntity {
  title: string;
  startDate: string;
  endDate: string;
  standardPrice: number;
  area: string;
  image: string[];
  travelPoint: string;
  travelDays: number;
  departureData: FlightData;
  arrivalData: FlightData;
  airline: string;
  status: Status;
  category: string;
  detailContent: string;
  detailImage: string;
}
