import { Status } from './common';
import { Product } from './product';

export interface UserInfo {
  email: string;
  nickname: string;
}

export interface UserBooked {
  id: string;
  userId: string;
  reservationDate: string;
  departureDate: string;
  cost: number;
  personnel: number;
  isReviewed: boolean;
  status: Status;
  product: Product;
}
