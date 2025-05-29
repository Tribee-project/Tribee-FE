import axios from 'axios';

const productsApi = axios.create({
  baseURL: 'https://cfb9-125-133-70-87.ngrok-free.app/api/v1/product',
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
});

const getAllProducts = async () => {
  const response = await productsApi.get('/');
  return response.data;
};

const getProductById = async (id: string) => {
  const response = await productsApi.get(`/list?id=${id}`);
  return response.data;
};

export { getAllProducts, getProductById };
