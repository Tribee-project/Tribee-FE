import 'dayjs/locale/ko';

import { ConfigProvider, DatePicker, notification, Space } from 'antd';
import locale from 'antd/locale/ko_KR';
import dayjs from 'dayjs';
import { useState } from 'react';

dayjs.locale('ko');

const TRAVEL_DAYS = [
  {
    label: '3일',
    value: 'THREE_DAYS',
  },
  {
    label: '5일',
    value: 'FIVE_DAYS',
  },
  {
    label: '7일',
    value: 'SEVEN_DAYS',
  },
];

const WorkshopProductList: React.FC = () => {
  const [api, contextHolder] = notification.useNotification({
    maxCount: 1,
  });
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const openNotification = () => {
    api.info({
      message: `워크샵 여행 안내사항`,
      description: (
        <ul className="list-disc">
          <li>워크샵 여행은 체험 활동이 많으니 편한 복장을 준비하세요.</li>
          <li>전문 강사의 지도를 받으며 새로운 기술을 배울 수 있습니다.</li>
          <li>재료비나 도구 대여비가 별도로 발생할 수 있으니 확인하세요.</li>
        </ul>
      ),
      placement: 'top',
      style: {
        width: 650,
      },
    });
  };

  const handleDayClick = (day: string) => {
    if (selectedDay === day) {
      setSelectedDay(null);
    } else {
      setSelectedDay(day);
    }
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
            <p>🎨 워크샵 여행시 안내사항을 확인하세요</p>
          </div>
        </Space>
        <div className="flex w-full cursor-pointer flex-col gap-5 border-1 border-gray-200 shadow-lg">
          <div className="flex">
            <div className="h-50 w-50 bg-gray-300">
              <img
                alt="product-image"
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=410&h=280&fit=crop"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex w-150 flex-col bg-white p-7">
              <p className="overflow-hidden text-lg text-ellipsis whitespace-nowrap">
                4박 5일 이탈리아 토스카나 요리 워크샵 여행
                #이탈리아#토스카나#요리워크샵#파스타만들기#와인테이스팅
              </p>
              <div className="mt-auto flex items-end justify-between gap-2">
                <div className="flex gap-2">
                  <p>여행 일정 | </p>
                  <p>2025.06.15 ~ 2025.06.19</p>
                </div>
                <div className="text-lg font-bold">
                  <p>2,290,000원 ~</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopProductList;
