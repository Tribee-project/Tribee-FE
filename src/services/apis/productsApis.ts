import axios from 'axios';

import type { Product, QueryParams } from '@/types';

const productsApi = axios.create({
  baseURL: 'https://tribee-be.onrender.com/api/v1/product',
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
});

const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await productsApi.get<Product[]>('/');
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
        '상품 목록을 불러오는 중 오류가 발생했습니다.';
      throw new Error(message);
    }
    throw new Error('상품 목록을 불러오는 중 오류가 발생했습니다.');
  }
};

const getProductById = async (id: string): Promise<Product> => {
  if (!id?.trim()) {
    throw new Error('상품 ID가 필요합니다.');
  }

  try {
    const response = await productsApi.get<Product>(`/single/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('상품을 찾을 수 없습니다.');
      } else if (error.response?.status && error.response.status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else if (!error.response) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }

      const message =
        error.response?.data?.message ||
        '상품 정보를 불러오는 중 오류가 발생했습니다.';
      throw new Error(message);
    }
    throw new Error('상품 정보를 불러오는 중 오류가 발생했습니다.');
  }
};

const getProductsByArea = async (area: string): Promise<Product[]> => {
  if (!area?.trim()) {
    throw new Error('지역 정보가 필요합니다.');
  }

  try {
    const response = await productsApi.get<Product[]>(`?area1=${area}`);
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
        '지역별 상품을 불러오는 중 오류가 발생했습니다.';
      throw new Error(message);
    }
    throw new Error('지역별 상품을 불러오는 중 오류가 발생했습니다.');
  }
};

const getProductsByQueryParams = async (
  queryParams: QueryParams,
): Promise<Product[]> => {
  try {
    const searchParams = new URLSearchParams();

    if (queryParams.area) {
      searchParams.append('area1', queryParams.area);
    }

    if (queryParams.params) {
      Object.entries(queryParams.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
    }

    const response = await productsApi.get<Product[]>(
      `?${searchParams.toString()}`,
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status && error.response.status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else if (!error.response) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }

      const message =
        error.response?.data?.message || '상품 검색 중 오류가 발생했습니다.';
      throw new Error(message);
    }
    throw new Error('상품 검색 중 오류가 발생했습니다.');
  }
};

export {
  getAllProducts,
  getProductById,
  getProductsByArea,
  getProductsByQueryParams,
};
