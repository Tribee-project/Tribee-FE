import 'dayjs/locale/ko';

import {
  CalendarOutlined,
  CloseOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Calendar,
  ConfigProvider,
  Divider,
  InputNumber,
  Modal,
} from 'antd';
import { CalendarProps } from 'antd';
import locale from 'antd/locale/ko_KR';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getDynamicPrice } from '@/services/apis/priceApis';
import { DynamicPrice } from '@/types';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [personnelCount, setPersonnelCount] = useState<number>(1);
  const [calendarValue, setCalendarValue] = useState<Dayjs>(dayjs());
  const [prices, setPrices] = useState<DynamicPrice | null>(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState<boolean>(false);
  const [priceError, setPriceError] = useState<string | null>(null);
  const { id } = useParams();

  dayjs.locale('ko');

  const disabledDate = (current: Dayjs) => {
    const today = dayjs();
    const sevenDaysLater = today.add(7, 'day');
    const fiveMonthsLater = today.add(5, 'month');
    return (
      current &&
      (current.isBefore(sevenDaysLater, 'day') ||
        current.isAfter(fiveMonthsLater, 'day'))
    );
  };

  const onDateSelect: CalendarProps<Dayjs>['onSelect'] = (date) => {
    if (!disabledDate(date)) {
      setSelectedDate(date);
      setCalendarValue(date);
    }
  };

  const getPrice = (date: Dayjs | null) => {
    if (!date) return 150000;

    // API에서 받은 동적 가격이 있으면 사용
    if (prices && date.format('YYYY-MM-DD') === prices.selectedDate) {
      return prices.price;
    }

    // 기본 가격 로직 (API 데이터가 없을 때)
    const isWeekend = date.day() === 0 || date.day() === 6;
    const basePrice = 150000;
    const weekendSurcharge = 30000;

    return isWeekend ? basePrice + weekendSurcharge : basePrice;
  };

  const pricePerPerson = selectedDate ? getPrice(selectedDate) : 150000;
  const totalPrice = pricePerPerson * personnelCount;

  const handleBooking = () => {
    if (!selectedDate) {
      alert('날짜를 선택해주세요.');
      return;
    }

    console.log({
      date: selectedDate.format('YYYY-MM-DD'),
      adults: personnelCount,
      totalPrice,
    });

    alert('예약이 완료되었습니다!');
    onClose();
  };

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPrice = async () => {
      if (!id) return;

      setIsLoadingPrice(true);
      setPriceError(null);

      try {
        const monthStart = calendarValue.startOf('month').format('YYYY-MM-DD');
        const monthEnd = calendarValue.endOf('month').format('YYYY-MM-DD');

        const dynamicPrice = await getDynamicPrice(id, monthStart, monthEnd);

        if (!abortController.signal.aborted) {
          setPrices(dynamicPrice);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error('가격 정보를 불러오는데 실패했습니다:', error);
          setPriceError('가격 정보를 불러올 수 없습니다. 다시 시도해주세요.');
          setPrices(null);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoadingPrice(false);
        }
      }
    };

    if (isOpen) {
      fetchPrice();
    }

    return () => {
      abortController.abort();
    };
  }, [id, calendarValue, isOpen]);

  return (
    <ConfigProvider locale={locale}>
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={500}
        centered
        closeIcon={<CloseOutlined className="text-gray-500" />}
        className="purchase-modal"
      >
        <div className="p-6">
          <h2 className="mb-6 text-xl font-bold text-gray-800">
            여행 예약하기
          </h2>
          <button onClick={() => console.log(prices)}>calendarValue</button>

          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <CalendarOutlined className="text-yellow-500" />
              <span className="font-semibold text-gray-700">여행 날짜</span>
              {isLoadingPrice && (
                <span className="text-sm text-gray-500">
                  가격 정보 로딩 중...
                </span>
              )}
            </div>
            {priceError && (
              <div className="mb-3 rounded-md bg-red-50 p-3">
                <p className="text-sm text-red-600">{priceError}</p>
              </div>
            )}
            <div className="rounded-lg border border-gray-200 p-4">
              <Calendar
                fullscreen={false}
                disabledDate={disabledDate}
                onSelect={onDateSelect}
                value={calendarValue}
                className="custom-calendar"
                onChange={(newValue: Dayjs) => {
                  setCalendarValue(newValue);
                  if (selectedDate && !selectedDate.isSame(newValue, 'month')) {
                    setSelectedDate(null);
                  }
                }}
                headerRender={({ value, onChange }) => {
                  const monthOptions = [];
                  for (let i = 0; i < 12; i++) {
                    monthOptions.push(
                      <option key={i} value={i}>
                        {dayjs().month(i).format('MM월')}
                      </option>,
                    );
                  }

                  const yearOptions = [];
                  const currentYear = dayjs().year();
                  for (let i = currentYear; i <= currentYear + 1; i++) {
                    yearOptions.push(
                      <option key={i} value={i}>
                        {i}년
                      </option>,
                    );
                  }

                  return (
                    <div className="flex items-center justify-center gap-2 p-2">
                      <select
                        value={value.year()}
                        onChange={(e) => {
                          const newValue = value
                            .clone()
                            .year(parseInt(e.target.value));
                          onChange(newValue);
                          if (
                            selectedDate &&
                            !selectedDate.isSame(newValue, 'year')
                          ) {
                            setSelectedDate(null);
                          }
                        }}
                        className="rounded border border-gray-300 px-2 py-1 text-sm focus:border-yellow-400 focus:outline-none"
                      >
                        {yearOptions}
                      </select>
                      <select
                        value={value.month()}
                        onChange={(e) => {
                          const newValue = value
                            .clone()
                            .month(parseInt(e.target.value));
                          onChange(newValue);
                          if (
                            selectedDate &&
                            !selectedDate.isSame(newValue, 'month')
                          ) {
                            setSelectedDate(null);
                          }
                        }}
                        className="rounded border border-gray-300 px-2 py-1 text-sm focus:border-yellow-400 focus:outline-none"
                      >
                        {monthOptions}
                      </select>
                    </div>
                  );
                }}
              />
              {selectedDate && (
                <div className="mt-3 rounded-md bg-yellow-50 p-3">
                  <p className="text-sm font-medium text-gray-700">
                    선택된 날짜: {selectedDate.format('YYYY년 MM월 DD일')}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Divider />

          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <UserOutlined className="text-yellow-500" />
              <span className="font-semibold text-gray-700">인원수</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">인원수</p>
                  <p className="text-sm text-gray-500">총 인원</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="min-w-20 text-right font-medium text-gray-800">
                    {pricePerPerson.toLocaleString()}원
                  </span>
                  <InputNumber
                    min={1}
                    max={15}
                    value={personnelCount}
                    onChange={(value) => setPersonnelCount(value || 1)}
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          </div>

          <Divider />

          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-700">
                총 금액
              </span>
              <span className="text-xl font-bold text-yellow-600">
                {totalPrice.toLocaleString()}원
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              총 {personnelCount}명
            </div>
          </div>

          <Button
            type="primary"
            size="large"
            block
            onClick={handleBooking}
            disabled={!selectedDate}
            className={`h-12 text-lg font-semibold ${
              selectedDate
                ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                : 'cursor-not-allowed bg-gray-300 text-gray-500'
            }`}
          >
            예약하기
          </Button>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default PurchaseModal;
