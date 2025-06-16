import axios from 'axios';

import type { DynamicPrice } from '@/types';

const priceApi = axios.create({
  baseURL: 'https://tribee-be.onrender.com/api/v1/price',
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
});

const getDynamicPrice = async (
  prodId: string,
  startDate: string,
  endDate: string,
): Promise<DynamicPrice> => {
  const response = await priceApi.get<DynamicPrice>(
    `?prodId=${prodId}&startDate=${startDate}&endDate=${endDate}`,
  );
  return response.data;
};

export { getDynamicPrice };
