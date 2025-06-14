import { useNavigate, useSearchParams } from 'react-router-dom';

export const useQueryParams = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const navigateToProductDetail = (productId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('id', productId);

    navigate(`/product-detail?${params.toString()}`);
  };

  const getParam = (key: string) => {
    return searchParams.get(key);
  };

  return { navigateToProductDetail, getParam };
};
