import axios from 'axios';

import type { LoginData, SignUpData } from '@/types';

const authApi = axios.create({
  baseURL: 'https://tribee-be.onrender.com/api/v1/auth',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
});

const signUp = async (data: SignUpData): Promise<void> => {
  await authApi.post('/signup', data);
};

const login = async (data: LoginData): Promise<void> => {
  const response = await authApi.post('/login', data);
  const { accessToken } = response.data;
  localStorage.setItem('accessToken', accessToken);
};

export { login, signUp };
