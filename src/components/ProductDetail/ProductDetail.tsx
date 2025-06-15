import { ConfigProvider, Divider, Tabs, TabsProps } from 'antd';
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

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '상품 정보',
      children: (
        <div className="mt-5 flex flex-col gap-4 p-4">
          {product?.detailImage && (
            <div className="mt-6">
              <img
                src={product.detailImage}
                alt="상품 상세 이미지"
                className="w-full rounded-lg object-cover"
              />
            </div>
          )}
          <div className="mt-10 w-200 self-center rounded-lg border-1 border-gray-300 bg-white p-10 shadow-lg">
            <div
              dangerouslySetInnerHTML={{ __html: product?.detailContent || '' }}
            />
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: '여행 후기',
      children: (
        <div className="mt-5 flex flex-col gap-4 p-4">
          <div className="text-center text-gray-500">
            <p>아직 등록된 후기가 없습니다.</p>
            <p>첫 번째 후기를 남겨보세요!</p>
          </div>
        </div>
      ),
    },
  ];

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
      <div className="mt-20 flex flex-col gap-5">
        <p className="text-lg font-bold">여행 일정</p>
        <div className="w-full rounded-lg bg-gray-200 p-7">
          <div className="flex flex-col">
            <div className="flex w-full gap-2">
              <p>항공기 정보</p>
              <div className="ml-40 flex gap-10 text-sm">
                <div className="flex gap-2">
                  <p className="font-bold">항공사</p>
                  <p>{product?.airline}</p>
                </div>
                <p className="text-gray-400">|</p>
                <div className="flex gap-2">
                  <p className="font-bold">비행 예정 시간</p>
                  <p>{product?.departureData.timeTaken.split(':')[0]}시간</p>
                </div>
              </div>
            </div>
            <Divider className="bg-gray-400" />
            <div className="flex gap-2">
              <p> 여행 포인트</p>
              <div>
                <p className="ml-40 text-sm">{product?.travelPoint}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                itemSelectedColor: 'black',
                titleFontSizeLG: 17,
                inkBarColor: '#FECA3A',
                horizontalItemGutter: 50,
              },
            },
          }}
        >
          <Tabs defaultActiveKey="1" items={items} centered size="large" />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default ProductDetail;
