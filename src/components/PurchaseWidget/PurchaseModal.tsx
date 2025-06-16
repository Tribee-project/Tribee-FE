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
import React, { useState } from 'react';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [adultCount, setAdultCount] = useState<number>(1);
  const [calendarValue, setCalendarValue] = useState<Dayjs>(dayjs());

  dayjs.locale('ko');

  const disabledDate = (current: Dayjs) => {
    const today = dayjs();
    const sevenDaysLater = today.add(7, 'day');
    return current && current.isBefore(sevenDaysLater, 'day');
  };

  const onDateSelect: CalendarProps<Dayjs>['onSelect'] = (date) => {
    if (!disabledDate(date)) {
      setSelectedDate(date);
      setCalendarValue(date);
    }
  };

  const getPrice = (date: Dayjs | null) => {
    if (!date) return 150000;

    const isWeekend = date.day() === 0 || date.day() === 6;
    const basePrice = 150000;
    const weekendSurcharge = 30000;

    return isWeekend ? basePrice + weekendSurcharge : basePrice;
  };

  const pricePerPerson = selectedDate ? getPrice(selectedDate) : 150000;
  const totalPrice = pricePerPerson * adultCount;

  const handleBooking = () => {
    if (!selectedDate) {
      alert('날짜를 선택해주세요.');
      return;
    }

    console.log({
      date: selectedDate.format('YYYY-MM-DD'),
      adults: adultCount,
      totalPrice,
    });

    alert('예약이 완료되었습니다!');
    onClose();
  };

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

          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <CalendarOutlined className="text-yellow-500" />
              <span className="font-semibold text-gray-700">여행 날짜</span>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <Calendar
                fullscreen={false}
                disabledDate={disabledDate}
                onSelect={onDateSelect}
                value={calendarValue}
                className="custom-calendar"
                onChange={(newValue) => {
                  setCalendarValue(newValue);
                  if (
                    newValue.month() !== calendarValue.month() ||
                    newValue.year() !== calendarValue.year()
                  ) {
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
                  for (let i = currentYear; i <= currentYear + 2; i++) {
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
                          setSelectedDate(null);
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
                          setSelectedDate(null);
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
                    max={10}
                    value={adultCount}
                    onChange={(value) => setAdultCount(value || 1)}
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
            <div className="mt-2 text-sm text-gray-500">총 {adultCount}명</div>
          </div>

          <Button
            type="primary"
            size="large"
            block
            onClick={handleBooking}
            disabled={!selectedDate}
            className={`h-12 text-lg font-semibold ${
              selectedDate
                ? 'bg-yellow-400 hover:bg-yellow-500'
                : 'cursor-not-allowed bg-gray-300'
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
