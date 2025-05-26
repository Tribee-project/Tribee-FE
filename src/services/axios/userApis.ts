import axios from 'axios';

const userApi = axios.create({
  baseURL: 'https://cfb9-125-133-70-87.ngrok-free.app/api/v1/user',
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

const getUserInfo = async () => {
  const response = await userApi.get('/info');
  console.log('response:', response.data);
  return response.data;
};

export { getUserInfo };
