import axios from 'axios';

interface SignUpData {
  email: string;
  password: string;
  nickname: string;
}

interface LoginData {
  email: string;
  password: string;
}

const authApi = axios.create({
  baseURL: 'https://cfb9-125-133-70-87.ngrok-free.app/api/v1/auth',
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
