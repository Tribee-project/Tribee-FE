import axios from 'axios';

import type { Review } from '@/types';

const reviewApi = axios.create({
  baseURL: 'https://tribee-be.onrender.com/api/v1/review',
});

const getProductReviews = async (id: string): Promise<Review[]> => {
  try {
    const response = await reviewApi.get<Review[]>(`/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status && error.response.status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else if (!error.response) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }

      const message =
        error.response?.data?.message ||
        '상품 리뷰를 불러오는 중 오류가 발생했습니다.';
      throw new Error(message);
    }
    throw new Error('상품 리뷰를 불러오는 중 오류가 발생했습니다.');
  }
};

export { getProductReviews };
