import axios from 'axios';

import type {
  EditUserNicknameRequest,
  EditUserPasswordRequest,
  ReservationRequest,
  ReviewRequest,
  UpdateReviewRequest,
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
  try {
    const response = await userApi.get('/user/info');
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('로그인이 필요합니다.');
      } else if (error.response?.status && error.response.status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else if (!error.response) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }

      const message =
        error.response?.data?.message ||
        '사용자 정보를 불러오는 중 오류가 발생했습니다.';
      throw new Error(message);
    }
    throw new Error('사용자 정보를 불러오는 중 오류가 발생했습니다.');
  }
};

const editUserNickname = async (
  data: EditUserNicknameRequest,
): Promise<void> => {
  if (!data.nickname?.trim()) {
    throw new Error('닉네임을 입력해주세요.');
  }

  try {
    await userApi.put('/user/info', data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('로그인이 필요합니다.');
      } else if (error.response?.status && error.response.status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else if (!error.response) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }

      const message =
        error.response?.data?.message || '닉네임 변경 중 오류가 발생했습니다.';
      throw new Error(message);
    }
    throw new Error('닉네임 변경 중 오류가 발생했습니다.');
  }
};

const editUserPassword = async (
  data: EditUserPasswordRequest,
): Promise<void> => {
  if (!data.password?.trim()) {
    throw new Error('비밀번호를 입력해주세요.');
  }

  try {
    await userApi.put('/user/password', data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('로그인이 필요합니다.');
      } else if (error.response?.status && error.response.status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else if (!error.response) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }

      const message =
        error.response?.data?.message ||
        '비밀번호 변경 중 오류가 발생했습니다.';
      throw new Error(message);
    }
    throw new Error('비밀번호 변경 중 오류가 발생했습니다.');
  }
};

const getUserBooked = async (): Promise<UserBooked[]> => {
  try {
    const response = await userApi.get('/reservation');
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('로그인이 필요합니다.');
      } else if (error.response?.status && error.response.status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else if (!error.response) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }

      const message =
        error.response?.data?.message ||
        '예약 내역을 불러오는 중 오류가 발생했습니다.';
      throw new Error(message);
    }
    throw new Error('예약 내역을 불러오는 중 오류가 발생했습니다.');
  }
};

const createReservation = async (data: ReservationRequest): Promise<void> => {
  if (!data.prodId) {
    throw new Error('상품 정보가 누락되었습니다.');
  }

  try {
    await userApi.post('/reservation', data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('로그인이 필요합니다.');
      } else if (error.response?.status && error.response.status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else if (!error.response) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }

      const message =
        error.response?.data?.message || '예약 처리 중 오류가 발생했습니다.';
      throw new Error(message);
    }
    throw new Error('예약 처리 중 오류가 발생했습니다.');
  }
};

const createReview = async (data: ReviewRequest): Promise<void> => {
  try {
    await userApi.post('/review', data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('로그인이 필요합니다.');
      } else if (error.response?.status && error.response.status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else if (!error.response) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }

      const message =
        error.response?.data?.message || '리뷰 작성 중 오류가 발생했습니다.';
      throw new Error(message);
    }
    throw new Error('리뷰 작성 중 오류가 발생했습니다.');
  }
};

const getUserReviews = async () => {
  try {
    const response = await userApi.get('/review');
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('로그인이 필요합니다.');
      } else if (error.response?.status && error.response.status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else if (!error.response) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }

      const message =
        error.response?.data?.message ||
        '리뷰 내역을 불러오는 중 오류가 발생했습니다.';
      throw new Error(message);
    }
  }
};

const updateReview = async (data: UpdateReviewRequest): Promise<void> => {
  try {
    await userApi.put(`/review/${data.reviewId}`, { content: data.content });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('로그인이 필요합니다.');
      } else if (error.response?.status && error.response.status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else if (!error.response) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }

      const message =
        error.response?.data?.message || '리뷰 수정 중 오류가 발생했습니다.';
      throw new Error(message);
    }
    throw new Error('리뷰 수정 중 오류가 발생했습니다.');
  }
};

export {
  createReservation,
  createReview,
  editUserNickname,
  editUserPassword,
  getUserBooked,
  getUserInfo,
  getUserReviews,
  updateReview,
};
