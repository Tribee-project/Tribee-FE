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
  baseURL: 'https://tribee.loca.lt/api/v1/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use(
  (config) => {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const signUp = async (data: SignUpData) => {
  const response = await authApi.post('/signup', data);
  return response;
};

const login = async (data: LoginData) => {
  const response = await authApi.post('/login', data);
  const { accessToken } = response.data;
  localStorage.setItem('accessToken', accessToken);
  return response;
};

export { login, signUp };
