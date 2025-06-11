import 'dayjs/locale/ko';

import { ConfigProvider, DatePicker, notification, Space } from 'antd';
import locale from 'antd/locale/ko_KR';
import dayjs from 'dayjs';
import { useState } from 'react';

dayjs.locale('ko');

const TRAVEL_DAYS = [
  {
    label: '7일',
    value: 'SEVEN_DAYS',
  },
  {
    label: '10일',
    value: 'TEN_DAYS',
  },
  {
    label: '14일',
    value: 'FOURTEEN_DAYS',
  },
];

const AustraliaProductList: React.FC = () => {
  const [api, contextHolder] = notification.useNotification({
    maxCount: 1,
  });
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const openNotification = () => {
    api.info({
      message: `호주 여행 안내사항`,
      description: (
        <ul className="list-disc">
          <li>호주는 계절이 반대이므로 여행 시기에 맞는 옷을 준비하세요.</li>
          <li>자외선이 매우 강하니 선크림과 모자를 필수로 준비하세요.</li>
          <li>팁 문화가 없으며, 대부분 카드 결제가 가능합니다.</li>
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
            <p>🦘 호주 여행시 안내사항을 확인하세요</p>
          </div>
        </Space>
        <div className="flex w-full cursor-pointer flex-col gap-5 border-1 border-gray-200 shadow-lg">
          <div className="flex">
            <div className="h-50 w-50 bg-gray-300">
              <img
                alt="product-image"
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=410&h=280&fit=crop"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex w-150 flex-col bg-white p-7">
              <p className="overflow-hidden text-lg text-ellipsis whitespace-nowrap">
                9박 10일 호주 시드니 멜버른 완전정복 패키지
                #시드니#멜버른#오페라하우스#그레이트오션로드#코알라
              </p>
              <div className="mt-auto flex items-end justify-between gap-2">
                <div className="flex gap-2">
                  <p>여행 일정 | </p>
                  <p>2025.09.15 ~ 2025.09.24</p>
                </div>
                <div className="text-lg font-bold">
                  <p>3,290,000원 ~</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AustraliaProductList;
