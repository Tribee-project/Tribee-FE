import axios from 'axios';

import type {
  EditUserNicknameRequest,
  EditUserPasswordRequest,
  UserBooked,
  UserInfo,
} from '@/types';

const userApi = axios.create({
  baseURL: 'https://tribee-be.onrender.com/api/v1',
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
});

userApi.interceptors.request.use(
  (config) => {
    const token: string | null = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const getUserInfo = async (): Promise<UserInfo> => {
  const response = await userApi.get('/user/info');
  return response.data;
};

const editUserNickname = async (
  data: EditUserNicknameRequest,
): Promise<void> => {
  await userApi.put('/user/info', data);
};

const editUserPassword = async (
  data: EditUserPasswordRequest,
): Promise<void> => {
  await userApi.put('/user/password', data);
};

const getUserBooked = async (): Promise<UserBooked[]> => {
  const response = await userApi.get('/reservation');
  return response.data;
};

export { editUserNickname, editUserPassword, getUserBooked, getUserInfo };
