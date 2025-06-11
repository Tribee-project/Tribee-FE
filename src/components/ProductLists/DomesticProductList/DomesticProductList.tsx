import 'dayjs/locale/ko';

import { ConfigProvider, DatePicker, notification, Space } from 'antd';
import locale from 'antd/locale/ko_KR';
import dayjs from 'dayjs';
import { useState } from 'react';

dayjs.locale('ko');

const TRAVEL_DAYS = [
  {
    label: '2일',
    value: 'TWO_DAYS',
  },
  {
    label: '3일',
    value: 'THREE_DAYS',
  },
  {
    label: '4일',
    value: 'FOUR_DAYS',
  },
];

const DomesticProductList: React.FC = () => {
  const [api, contextHolder] = notification.useNotification({
    maxCount: 1,
  });
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const openNotification = () => {
    api.info({
      message: `국내 여행 안내사항`,
      description: (
        <ul className="list-disc">
          <li>국내 여행 시 대중교통 이용이 편리하니 교통카드를 준비하세요.</li>
          <li>계절별 날씨 변화가 크니 여행 지역의 날씨를 미리 확인하세요.</li>
          <li>지역 특산품과 맛집 정보를 미리 알아보고 방문하세요.</li>
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
            <p>🏔️ 국내 여행시 안내사항을 확인하세요</p>
          </div>
        </Space>
        <div className="flex w-full cursor-pointer flex-col gap-5 border-1 border-gray-200 shadow-lg">
          <div className="flex">
            <div className="h-50 w-50 bg-gray-300">
              <img
                alt="product-image"
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=410&h=280&fit=crop"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex w-150 flex-col bg-white p-7">
              <p className="overflow-hidden text-lg text-ellipsis whitespace-nowrap">
                2박 3일 부산 감천문화마을 힐링 여행 패키지
                #부산#감천문화마을#해운대#광안리#자갈치시장#돼지국밥
              </p>
              <div className="mt-auto flex items-end justify-between gap-2">
                <div className="flex gap-2">
                  <p>여행 일정 | </p>
                  <p>2025.04.25 ~ 2025.04.27</p>
                </div>
                <div className="text-lg font-bold">
                  <p>189,000원 ~</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomesticProductList;
