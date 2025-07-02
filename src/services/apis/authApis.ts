import axios from 'axios';

import type { LoginData, SignUpData } from '@/types';

const baseURL = import.meta.env.VITE_SERVER_API_BASEURL;

const authApi = axios.create({
  baseURL: `${baseURL}/api/v1/auth`,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
});

const signUp = async (data: SignUpData): Promise<void> => {
  try {
    await authApi.post('/signup', data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 409) {
        throw new Error('이미 사용 중인 이메일입니다.');
      } else if (error.response?.status && error.response.status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else if (!error.response) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }

      const message =
        error.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
      throw new Error(message);
    }
    throw new Error('회원가입 중 오류가 발생했습니다.');
  }
};

const login = async (data: LoginData): Promise<void> => {
  try {
    const response = await authApi.post('/login', data);
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else if (error.response?.status && error.response.status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else if (!error.response) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }

      const message =
        error.response?.data?.message || '로그인 중 오류가 발생했습니다.';
      throw new Error(message);
    }
    throw new Error('로그인 중 오류가 발생했습니다.');
  }
};

export { login, signUp };
