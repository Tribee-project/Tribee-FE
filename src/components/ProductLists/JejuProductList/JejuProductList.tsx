import { notification, Space } from 'antd';
import { useState } from 'react';

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
      <div className="flex w-40 flex-col gap-1">
        <div>여행 기간</div>
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
      <div className="flex w-200 flex-col items-center">
        <Space>
          <div
            className="w-200 cursor-pointer bg-gray-200 p-2 text-center"
            onClick={() => openNotification()}
          >
            <p>🍊 제주도 여행시 안내사항을 확인하세요</p>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default JejuProductList;
