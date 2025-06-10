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
    label: '4일',
    value: 'FOUR_DAYS',
  },
  {
    label: '5일',
    value: 'FIVE_DAYS',
  },
];

const JejuProductList: React.FC = () => {
  const [api, contextHolder] = notification.useNotification({
    maxCount: 1,
  });
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

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
            <p>🍊 제주도 여행시 안내사항을 확인하세요</p>
          </div>
        </Space>
        <div className="flex w-full flex-col gap-5 border-1 border-gray-200 shadow-lg">
          <div className="flex">
            <div className="h-50 w-50 bg-gray-300">이미지</div>
            <div className="flex w-150 flex-col bg-white p-7">
              <p className="overflow-hidden text-lg text-ellipsis whitespace-nowrap">
                4박 5일 제주도 감성여행 패키지
                #우도#렌트카#제주동부#성산일출봉#성산맛집
              </p>
              <div className="mt-auto flex items-end justify-between gap-2">
                <div className="flex gap-2">
                  <p>여행 일정 | </p>
                  <p>2025.06.10 ~ 2025.06.14</p>
                </div>
                <div className="text-lg font-bold">
                  <p>399,000원 ~</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JejuProductList;
