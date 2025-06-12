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

import { getProductsByArea } from '@/services/apis/productsApis';

dayjs.extend(isBetween);
dayjs.locale('ko');

interface Product {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  standardPrice: number;
  area: string;
  image: string[];
  travelPoint: string;
  travelDays: number;
  departureData: {
    departureTime: string;
    arrivalTime: string;
    timeTaken: string;
  };
  arrivalData: {
    departureTime: string;
    arrivalTime: string;
    timeTaken: string;
  };
  airline: string;
  status: number;
  category: string;
  detailContent: string;
  detailImage: string;
}

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
    api.info({
      message: `제주도 여행 안내사항`,
      description: (
        <ul className="list-disc">
          <li>
            제주도 여행 시 날씨 변화가 심하니 우산과 바람막이를 준비하세요.
          </li>
          <li>
            렌터카 이용 시 도로가 좁으니 주의 운전하시고, 현지 맛집은 미리
            예약하는 것을 추천합니다.
          </li>
          <li>햇빛이 강하니 자외선 차단제를 준비하세요.</li>
        </ul>
      ),
      placement: 'top',
      style: {
        width: 650,
      },
    });
  };

  const applyFilters = (
    dayFilter: number | null,
    monthFilter: Dayjs | null,
  ) => {
    let filteredProducts = [...originalProducts];

    if (dayFilter) {
      filteredProducts = filteredProducts.filter(
        (product) => product.travelDays === dayFilter,
      );
    }

    if (monthFilter) {
      filteredProducts = filteredProducts.filter((product) => {
        const startDate = dayjs(product.startDate);
        const endDate = dayjs(product.endDate);
        return monthFilter.isBetween(startDate, endDate, 'month', '[]');
      });
    }

    setCurrentProducts(filteredProducts);
  };

  const handleDayClick = (day: number) => {
    if (selectedDay === day) {
      setSelectedDay(null);
      applyFilters(null, selectedMonth);
    } else {
      setSelectedDay(day);
      applyFilters(day, selectedMonth);
    }
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
      <div className="flex w-200 flex-col items-center gap-15">
        <Space>
          <div
            className="w-200 cursor-pointer rounded-md bg-gray-200 p-2 text-center"
            onClick={() => openNotification()}
          >
            <p>🍊 제주도 여행시 안내사항을 확인하세요</p>
          </div>
        </Space>
        {currentProducts.map((product) => (
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

export default JejuProductList;
