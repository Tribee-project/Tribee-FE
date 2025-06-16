import { useNavigate, useParams } from 'react-router-dom';

export const useProductId = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const productCode = id?.split('-')[0].toLocaleUpperCase();

  const navigateToProductDetail = (productId: string) => {
    navigate(`/product-detail/${productId}`);
  };

  return { navigateToProductDetail, productCode, id };
};
