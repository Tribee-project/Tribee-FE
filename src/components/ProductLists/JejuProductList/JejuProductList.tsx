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
import { useEffect, useState } from 'react';

import { TRAVEL_NOTIFICATIONS } from '@/constants/travelNotifications';
import { getProductsByArea } from '@/services/apis/productsApis';
import type { Product } from '@/types';

dayjs.extend(isBetween);
dayjs.locale('ko');

const TRAVEL_DAYS = [
  {
    label: '3일',
    value: 3,
  },
  {
    label: '4일',
    value: 4,
  },
  {
    label: '5일',
    value: 5,
  },
];

const JejuProductList: React.FC = () => {
  const [api, contextHolder] = notification.useNotification({
    maxCount: 1,
  });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(null);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProductsByArea('JEJU');
      setCurrentProducts(productList);
      setOriginalProducts(productList);
    };

    fetchProducts();
  }, []);

  const openNotification = () => {
    api.info(TRAVEL_NOTIFICATIONS.JEJU);
  };

  const applyFilters = (
    dayFilter: number | null,
    monthFilter: Dayjs | null,
  ) => {
    const filteredProducts = originalProducts.filter((product) => {
      const dayMatch = !dayFilter || product.travelDays === dayFilter;
      const monthMatch =
        !monthFilter ||
        monthFilter.isBetween(
          dayjs(product.startDate),
          dayjs(product.endDate),
          'month',
          '[]',
        );
      return dayMatch && monthMatch;
    });

    setCurrentProducts(filteredProducts);
  };

  const handleDayClick = (day: number) => {
    const newSelectedDay = selectedDay === day ? null : day;
    setSelectedDay(newSelectedDay);
    applyFilters(newSelectedDay, selectedMonth);
  };

  const handleMonthChange: DatePickerProps['onChange'] = (date) => {
    setSelectedMonth(date);
    applyFilters(selectedDay, date);
  };

  const disabledDate = (current: Dayjs) => {
    return current && current.isBefore(dayjs(), 'month');
  };

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
            onClick={() => openNotification()}
          >
            <p>🍊 제주도 여행시 안내사항을 확인하세요</p>
          </div>
        </Space>
        {currentProducts.map((product) => (
          <div
            className="flex w-full cursor-pointer flex-col border-1 border-gray-200 shadow-lg"
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
                        <p>이용 항공</p>
                        <p className="text-gray-600">{product.airline}</p>
                      </div>
                      <p className="text-gray-300">|</p>
                      <div className="flex gap-4">
                        <p>비행 시간</p>
                        <p className="text-gray-600">
                          {product.departureData.timeTaken.split(':')[0] +
                            '시간'}
                        </p>
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

export default JejuProductList;
