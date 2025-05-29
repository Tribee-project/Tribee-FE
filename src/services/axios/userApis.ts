import axios from 'axios';

interface UserBooked {
  id: string;
  userId: string;
  prodId: string;
  reservationDate: string;
  departureDate: string;
  cost: number;
  personnel: number;
  status: number;
}

const userApi = axios.create({
  baseURL: 'https://cfb9-125-133-70-87.ngrok-free.app/api/v1',
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
  const response = await userApi.get('/user/info');
  return response.data;
};

const editUserNickname = async (data: { nickname: string }): Promise<void> => {
  await userApi.put('/user/info', data);
};

const editUserPassword = async (data: { password: string }): Promise<void> => {
  await userApi.put('/user/password', data);
};

const getUserBooked = async (): Promise<UserBooked[]> => {
  const response = await userApi.get('/reservation');
  return response.data;
};

export { editUserNickname, editUserPassword, getUserBooked, getUserInfo };
