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
