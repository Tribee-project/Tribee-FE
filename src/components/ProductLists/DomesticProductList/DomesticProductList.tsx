import 'dayjs/locale/ko';

import {
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  notification,
  Space,
} from 'antd';
import locale from 'antd/locale/ko_KR';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { TRAVEL_NOTIFICATIONS } from '@/constants/travelNotifications';
import { useProductId } from '@/hooks/useProductId';
import { getProductsByQueryParams } from '@/services/apis/productsApis';
import type { Product, QueryParams } from '@/types';

dayjs.extend(isBetween);
dayjs.locale('ko');

const DomesticProductList: React.FC = () => {
  const [api, contextHolder] = notification.useNotification({
    maxCount: 1,
  });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const { navigateToProductDetail } = useProductId();
  const [searchParams, setSearchParams] = useSearchParams();

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

  const openNotification = useCallback(() => {
    api.info(TRAVEL_NOTIFICATIONS.DOMESTIC);
  }, [api]);

  const handleDayClick = useCallback(
    (day: number) => {
      const newSelectedDay = selectedDay === day ? null : day;
      setSelectedDay(newSelectedDay);
      if (newSelectedDay) {
        searchParams.set('travelDays', newSelectedDay.toString());
      } else {
        searchParams.delete('travelDays');
      }
      setSearchParams(searchParams);
    },
    [selectedDay, searchParams, setSearchParams],
  );

  const handleMonthChange: DatePickerProps['onChange'] = useCallback(
    (date: Dayjs | null) => {
      if (date) {
        searchParams.set('startDate', date.format('YYYY-MM'));
      } else {
        searchParams.delete('startDate');
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const handleProductClick = useCallback(
    (productId: string) => {
      navigateToProductDetail(productId);
    },
    [navigateToProductDetail],
  );

  const disabledDate = useCallback((current: Dayjs) => {
    return current && current.isBefore(dayjs(), 'month');
  }, []);

  useEffect(() => {
    const travelDays = Number(searchParams.get('travelDays'));
    const startDate = searchParams.get('startDate');

    const fetchProducts = async () => {
      const queryParams: QueryParams = {
        area: 'DOMESTIC_AREA',
        params: { category: 'DOMESTIC' },
      };

      if (travelDays && !isNaN(travelDays)) {
        queryParams.params.travelDays = travelDays;
      }

      if (startDate && dayjs(startDate).isValid()) {
        queryParams.params.startDate = dayjs(startDate).format('YYYY-MM');
      }

      const productList = await getProductsByQueryParams(queryParams);
      setCurrentProducts(productList);
    };

    fetchProducts();
  }, [searchParams]);

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
                  colorPrimary: '#FECA3A',
                  colorPrimaryHover: '#FED047',
                  colorPrimaryActive: '#FEB800',
                  colorTextLightSolid: '#000000',
                },
              },
            }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <DatePicker
                onChange={handleMonthChange}
                disabledDate={disabledDate}
                picker="month"
                placeholder="출발 월"
                size="middle"
                style={{ width: '100%' }}
              />
            </Space>
          </ConfigProvider>
        </div>
      </div>
      <div className="flex w-200 flex-col items-center gap-10">
        <Space>
          <div
            className="mb-8 w-200 cursor-pointer rounded-md bg-gray-200 p-2 text-center"
            onClick={openNotification}
          >
            <p>🏔️ 국내 여행시 안내사항을 확인하세요</p>
          </div>
        </Space>
        {currentProducts.map((product) => (
          <div
            className="flex w-full cursor-pointer flex-col border-1 border-gray-200 shadow-lg"
            key={product._id}
            onClick={() => handleProductClick(product._id)}
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
                  <div className="text-red-450 text-lg font-bold text-red-400">
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
