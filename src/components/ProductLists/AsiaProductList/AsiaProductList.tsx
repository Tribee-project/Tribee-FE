import 'dayjs/locale/ko';

import { ConfigProvider, DatePicker, notification, Space } from 'antd';
import locale from 'antd/locale/ko_KR';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';

import { TRAVEL_NOTIFICATIONS } from '@/constants/travelNotifications';

dayjs.locale('ko');

const AsiaProductList: React.FC = () => {
  const [api, contextHolder] = notification.useNotification({
    maxCount: 1,
  });
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const TRAVEL_DAYS = useMemo(
    () => [
      {
        label: '5일',
        value: 'FIVE_DAYS',
      },
      {
        label: '7일',
        value: 'SEVEN_DAYS',
      },
      {
        label: '10일',
        value: 'TEN_DAYS',
      },
    ],
    [],
  );

  const COUNTRIES = useMemo(
    () => [
      {
        label: '태국',
        value: 'THAILAND',
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=410&h=280&fit=crop',
        packageTitle: '6박 7일 태국 방콕 푸켓 힐링 여행 패키지',
        hashtags: '#방콕#푸켓#왓포사원#파통비치#태국마사지#팟타이',
        price: '1,190,000원 ~',
      },
      {
        label: '베트남',
        value: 'VIETNAM',
        image:
          'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=410&h=280&fit=crop',
        packageTitle: '5박 6일 베트남 하노이 하롱베이 호치민 완전정복',
        hashtags: '#하노이#하롱베이#호치민#쌀국수#바인미#메콩델타',
        price: '890,000원 ~',
      },
      {
        label: '싱가포르',
        value: 'SINGAPORE',
        image:
          'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=410&h=280&fit=crop',
        packageTitle: '4박 5일 싱가포르 마리나베이 센토사 럭셔리 투어',
        hashtags: '#마리나베이#센토사#머라이언#가든스바이더베이#칠리크랩',
        price: '1,450,000원 ~',
      },
    ],
    [],
  );

  const selectedCountryData = useMemo(() => {
    return COUNTRIES.find((country) => country.value === selectedCountry);
  }, [COUNTRIES, selectedCountry]);

  const openNotification = useCallback(() => {
    api.info(TRAVEL_NOTIFICATIONS.ASIA);
  }, [api]);

  const handleDayClick = useCallback(
    (day: string) => {
      if (selectedDay === day) {
        setSelectedDay(null);
      } else {
        setSelectedDay(day);
      }
    },
    [selectedDay],
  );

  const handleCountryClick = useCallback(
    (country: string) => {
      if (selectedCountry === country) {
        setSelectedCountry(null);
      } else {
        setSelectedCountry(country);
      }
    },
    [selectedCountry],
  );

  return (
    <div className="mt-10 mb-10 flex justify-center gap-15">
      {contextHolder}
      <div className="flex w-40 flex-col gap-15">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-bold">국가 선택</div>
          <div className="flex flex-wrap gap-2">
            {COUNTRIES.map((country) => (
              <button
                key={country.value}
                className={`cursor-pointer rounded-md border-1 border-amber-300 px-3 py-1 text-sm ${
                  selectedCountry === country.value
                    ? 'bg-amber-300'
                    : 'bg-white'
                }`}
                onClick={() => handleCountryClick(country.value)}
              >
                {country.label}
              </button>
            ))}
          </div>
        </div>
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
            onClick={openNotification}
          >
            <p>🌴 동남아시아 여행시 안내사항을 확인하세요</p>
          </div>
        </Space>
        <div className="flex w-full flex-col gap-5">
          {selectedCountry ? (
            <div className="flex cursor-pointer flex-col gap-5 border-1 border-gray-200 shadow-lg">
              <div className="flex">
                <div className="h-50 w-50 bg-gray-300">
                  <img
                    alt="product-image"
                    src={selectedCountryData?.image}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex w-150 flex-col bg-white p-7">
                  <p className="overflow-hidden text-lg text-ellipsis whitespace-nowrap">
                    {selectedCountryData?.packageTitle}
                    {selectedCountryData?.hashtags}
                  </p>
                  <div className="mt-auto flex items-end justify-between gap-2">
                    <div className="flex gap-2">
                      <p>여행 일정 | </p>
                      <p>2025.02.10 ~ 2025.02.16</p>
                    </div>
                    <div className="text-lg font-bold">
                      <p>{selectedCountryData?.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            COUNTRIES.map((country) => (
              <div
                key={country.value}
                className="flex cursor-pointer flex-col gap-5 border-1 border-gray-200 shadow-lg"
              >
                <div className="flex">
                  <div className="h-50 w-50 bg-gray-300">
                    <img
                      alt="product-image"
                      src={country.image}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex w-150 flex-col bg-white p-7">
                    <p className="overflow-hidden text-lg text-ellipsis whitespace-nowrap">
                      {country.packageTitle}
                      {country.hashtags}
                    </p>
                    <div className="mt-auto flex items-end justify-between gap-2">
                      <div className="flex gap-2">
                        <p>여행 일정 | </p>
                        <p>2025.02.10 ~ 2025.02.16</p>
                      </div>
                      <div className="text-lg font-bold">
                        <p>{country.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AsiaProductList;
