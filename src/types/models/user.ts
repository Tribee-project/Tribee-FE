import { Status } from './common';

export interface UserInfo {
  email: string;
  nickname: string;
}

export interface UserBooked {
  id: string;
  userId: string;
  prodId: string;
  reservationDate: string;
  departureDate: string;
  cost: number;
  personnel: number;
  status: Status;
}
