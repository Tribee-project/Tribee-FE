import axios from 'axios';

import type { DynamicPrice } from '@/types';

const baseURL = import.meta.env.VITE_SERVER_API_BASEURL;

const priceApi = axios.create({
  baseURL: `${baseURL}/api/v1/price`,
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
});

const getDynamicPrice = async (
  prodId: string,
  startDate: string,
  endDate: string,
): Promise<DynamicPrice[]> => {
  try {
    const response = await priceApi.get<DynamicPrice[]>(
      `?prodId=${prodId}&startDate=${startDate}&endDate=${endDate}`,
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('가격 정보를 찾을 수 없습니다.');
      } else if (error.response?.status && error.response.status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else if (!error.response) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }

      const message =
        error.response?.data?.message ||
        '가격 정보를 불러오는 중 오류가 발생했습니다.';
      throw new Error(message);
    }
    throw new Error('가격 정보를 불러오는 중 오류가 발생했습니다.');
  }
};

export { getDynamicPrice };
