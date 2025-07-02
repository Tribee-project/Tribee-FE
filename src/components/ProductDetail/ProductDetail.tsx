import { ConfigProvider, Divider, Tabs, TabsProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { useProductId } from '@/hooks/useProductId';
import { getProductById } from '@/services/apis/productsApis';
import { getProductReviews } from '@/services/apis/reviewApis';
import { Product, Review } from '@/types';

const ProductDetail: React.FC = () => {
  const { id, productCode } = useProductId();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductById(id as string);
      setProduct(response);
    };

    const fetchReviews = async () => {
      const reviewData = await getProductReviews(id as string);
      setReviews(reviewData);
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  const items: TabsProps['items'] = useMemo(() => {
    return [
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
                dangerouslySetInnerHTML={{
                  __html: product?.detailContent || '',
                }}
              />
            </div>
          </div>
        ),
      },
      {
        key: '2',
        label: '여행 후기',
        children:
          reviews.length > 0 ? (
            <div className="mt-5 flex flex-col gap-6 p-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                        {review.nickname
                          ? review.nickname.charAt(0).toUpperCase()
                          : 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {review.nickname || '익명'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {review.createdAt.split('T')[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="leading-relaxed text-gray-700">
                    <p>{review.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 flex flex-col gap-4 p-4">
              <div className="text-center text-gray-500">
                <p>아직 등록된 후기가 없습니다.</p>
                <p>첫 번째 후기를 남겨보세요!</p>
              </div>
            </div>
          ),
      },
    ];
  }, [product, reviews]);

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
