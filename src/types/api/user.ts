import { UserBooked, UserInfo } from '../models/user';

export interface UserInfoResponse {
  data: UserInfo;
}

export interface UserBookedResponse {
  data: UserBooked[];
}

export interface EditUserNicknameRequest {
  nickname: string;
}

export interface EditUserPasswordRequest {
  password: string;
}

export interface ReservationRequest {
  prodId: string;
  reservationDate: string;
  departureDate: string;
  cost: number;
  personnel: number;
  category: 'PACKAGE' | 'TOUR_TICKET';
}
