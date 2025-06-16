import axios from 'axios';

import type { Product } from '@/types';

const productsApi = axios.create({
  baseURL: 'https://cfb9-125-133-70-87.ngrok-free.app/api/v1/product',
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
});

const getAllProducts = async (): Promise<Product[]> => {
  const response = await productsApi.get<Product[]>('/');
  return response.data;
};

const getProductById = async (id: string): Promise<Product> => {
  const response = await productsApi.get<Product>(`/single/${id}`);
  return response.data;
};

const getProductsByArea = async (area: string): Promise<Product[]> => {
  const response = await productsApi.get<Product[]>(`?area1=${area}`);
  return response.data;
};

export { getAllProducts, getProductById, getProductsByArea };
