import { Divider } from 'antd';
import { useEffect, useState } from 'react';

import { useQueryParams } from '@/hooks/useQueryParams';
import { getProductById } from '@/services/apis/productsApis';
import { Product } from '@/types';

const ProductDetail: React.FC = () => {
  const { getParam } = useQueryParams();
  const productId = getParam('id');
  const productCode = productId?.split('-')[0];

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductById(productId as string);
      setProduct(response);
    };
    fetchProduct();
  }, [productId]);

  return (
    <div className="my-25 flex w-250 flex-col gap-1">
      <div className="flex gap-3">
        <div className="flex gap-2">
          <p className="text-gray-600">상품 코드</p>
          <p>{productCode}</p>
        </div>
        <p className="mx-3 text-gray-300">|</p>
        <div className="flex gap-2">
          <p className="text-gray-600">후기</p>
          <div className="flex">
            <p>100</p>
            <p className="text-gray-600">건</p>
          </div>
        </div>
      </div>
      <div className="mt-10 text-2xl font-bold">{product?.title}</div>
      <div className="flex gap-10 text-sm">
        <div className="flex gap-2">
          <p className="text-gray-600">출발 기간</p>
          <p>
            {product?.startDate} ~ {product?.endDate}
          </p>
        </div>
        <div className="flex gap-2">
          <p className="text-gray-600">성인</p>
          <div className="flex">
            <p>{product?.standardPrice.toLocaleString()}</p>
            <p className="text-gray-600">원~</p>
          </div>
        </div>
      </div>
      <Divider className="bg-gray-400" />
      <div className="mt-5 flex justify-between gap-5">
        {product?.image.map((image) => (
          <div className="h-55 w-55 overflow-hidden" key={image}>
            <img
              src={image}
              alt="product"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
