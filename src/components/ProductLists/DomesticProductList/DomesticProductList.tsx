import 'dayjs/locale/ko';

import { ConfigProvider, DatePicker, notification, Space } from 'antd';
import locale from 'antd/locale/ko_KR';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { TRAVEL_NOTIFICATIONS } from '@/constants/travelNotifications';
import { getProductsByArea } from '@/services/apis/productsApis';
import type { Product } from '@/types';

dayjs.locale('ko');

const DomesticProductList: React.FC = () => {
  const [api, contextHolder] = notification.useNotification({
    maxCount: 1,
  });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);

  const TRAVEL_DAYS = useMemo(
    () => [
      {
        label: '3일',
        value: 3,
      },
      {
        label: '4일',
        value: 4,
      },
    ],
    [],
  );

  const products = useMemo(() => {
    if (selectedDay === null) {
      return originalProducts;
    }
    return originalProducts.filter(
      (product) => product.travelDays === selectedDay,
    );
  }, [originalProducts, selectedDay]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProductsByArea('DOMESTIC_AREA');
      setOriginalProducts(productList);
    };

    fetchProducts();
  }, []);

  const openNotification = useCallback(() => {
    api.info(TRAVEL_NOTIFICATIONS.DOMESTIC);
  }, [api]);

  const handleDayClick = useCallback((day: number) => {
    setSelectedDay((prevSelectedDay) => (prevSelectedDay === day ? null : day));
  }, []);

  return (
    <div className="mt-10 mb-10 flex justify-center gap-15">
      {contextHolder}
      <div className="flex w-40 flex-col gap-15">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-bold">여행 기간</div>
          <div className="flex flex-wrap gap-2">
            {TRAVEL_DAYS.map((day) => (
              <button
                key={day.value}
                className={`cursor-pointer rounded-md border-1 border-amber-300 px-3 py-1 text-sm ${
                  selectedDay === day.value ? 'bg-amber-300' : 'bg-white'
                }`}
                onClick={() => handleDayClick(day.value)}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-bold">출발 일정</div>
          <ConfigProvider
            locale={locale}
            theme={{
              components: {
                DatePicker: {
                  colorBorder: '#FECA3A',
                  hoverBorderColor: '#FECA3A',
                  activeBorderColor: '#FECA3A',
                },
              },
            }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <DatePicker
                onChange={() => {}}
                picker="month"
                placeholder="출발 월"
                size="middle"
                style={{ width: '100%' }}
              />
            </Space>
          </ConfigProvider>
        </div>
      </div>
      <div className="flex w-200 flex-col items-center gap-15">
        <Space>
          <div
            className="w-200 cursor-pointer rounded-md bg-gray-200 p-2 text-center"
            onClick={() => openNotification()}
          >
            <p>🏔️ 국내 여행시 안내사항을 확인하세요</p>
          </div>
        </Space>
        {products.map((product) => (
          <div
            className="flex w-full cursor-pointer flex-col gap-5 border-1 border-gray-200 shadow-lg"
            key={product._id}
          >
            <div className="flex">
              <div className="h-50 w-50">
                <img
                  alt={product.title}
                  src={product.image[0]}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex w-150 flex-col bg-white p-7">
                <p className="overflow-hidden text-xl font-semibold text-ellipsis whitespace-nowrap">
                  {product.title + ' ' + product.travelDays + '일'}
                </p>
                <div className="mt-auto flex items-end justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-4 text-sm">
                      <p>출발 기간</p>
                      <p className="text-gray-600">
                        {dayjs(product.startDate).format('YYYY.MM.DD')} ~{' '}
                        {dayjs(product.endDate).format('YYYY.MM.DD')}
                      </p>
                    </div>
                    <div className="flex gap-5 text-sm">
                      <div className="flex gap-4">
                        <p>여행 설명</p>
                        <p className="text-gray-600">{product.travelPoint}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-lg font-bold">
                    <p>{product.standardPrice.toLocaleString()} 원 ~</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DomesticProductList;
