import 'dayjs/locale/ko';

import { CreditCardOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button,
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Divider,
  InputNumber,
  Space,
  Spin,
} from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getDynamicPrice } from '@/services/apis/priceApis';
import { createReservation } from '@/services/apis/userApis';
import { DynamicPrice } from '@/types/api/price';

const ReservationWidget = () => {
  const [dynamicPrices, setDynamicPrices] = useState<DynamicPrice[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [currentViewMonth, setCurrentViewMonth] = useState<Dayjs>(dayjs());
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [personCount, setPersonCount] = useState<number>(1);
  const [isReservationLoading, setIsReservationLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const onChange: DatePickerProps['onChange'] = useCallback(
    (date: Dayjs | null) => {
      setSelectedDate(date || undefined);
      setSelectedPrice(
        dynamicPrices.length > 0 && date
          ? dynamicPrices[date.date() - 1]?.price || 0
          : 0,
      );
    },
    [dynamicPrices],
  );

  const onOpenChange = useCallback((open: boolean) => {
    if (open) {
      setCurrentViewMonth(dayjs());
    }
  }, []);

  const onPanelChange = useCallback((value: Dayjs, mode: string) => {
    if (mode === 'date') {
      setCurrentViewMonth(value);
    }
  }, []);

  const disabledDate: DatePickerProps['disabledDate'] = useCallback(
    (current: Dayjs) => {
      const today = dayjs();
      const sevenDaysLater = today.add(7, 'day');
      const fiveMonthsLater = today.add(5, 'month');

      return (
        current && (current <= sevenDaysLater || current >= fiveMonthsLater)
      );
    },
    [],
  );

  const totalPrice = useMemo(() => {
    return selectedPrice * personCount;
  }, [selectedPrice, personCount]);

  const averagePrice = useMemo(() => {
    return dynamicPrices.length > 0
      ? dynamicPrices.reduce((sum, item) => sum + item.price, 0) /
          dynamicPrices.length
      : 0;
  }, [dynamicPrices]);

  const cellRender: DatePickerProps['cellRender'] = useCallback(
    (current: string | number | Dayjs) => {
      if (!dayjs.isDayjs(current)) return <div>{current}</div>;

      const today = dayjs();
      const sevenDaysLater = today.add(7, 'day');
      const fiveMonthsLater = today.add(5, 'month');
      const isDisabled =
        current && (current <= sevenDaysLater || current >= fiveMonthsLater);

      const viewingMonth = currentViewMonth;
      const isDifferentMonth = !current.isSame(viewingMonth, 'month');

      const currentPrice =
        dynamicPrices && dynamicPrices[current.date() - 1]?.price;
      const isExpensive = currentPrice && currentPrice > averagePrice;

      const price = isPriceLoading
        ? '. . .'
        : isDisabled || isDifferentMonth
          ? '-'
          : currentPrice
            ? (currentPrice / 10000).toFixed(1) + '만원'
            : '-';

      const priceColor = isExpensive ? 'text-orange-500' : 'text-gray-500';

      return (
        <>
          <div className="flex flex-col items-center">
            <div>{current.date()}</div>
            <div className={`text-[11px] ${priceColor}`}>{price}</div>
          </div>
        </>
      );
    },
    [dynamicPrices, currentViewMonth, isPriceLoading, averagePrice],
  );

  const handleReservation = useCallback(async () => {
    if (!selectedDate || !totalPrice || !personCount || !id) return;

    setIsReservationLoading(true);
    try {
      await createReservation({
        prodId: id as string,
        reservationDate: dayjs().format('YYYY-MM-DD') as string,
        departureDate: selectedDate?.format('YYYY-MM-DD') as string,
        cost: totalPrice,
        personnel: personCount,
        category: 'PACKAGE',
      });
      alert('예약이 완료되었습니다.');
      navigate('/user/booked');
    } catch (error) {
      console.error('예약 실패:', error);
      alert('예약에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsReservationLoading(false);
    }
  }, [selectedDate, totalPrice, personCount, id, navigate]);

  const handlePersonCountChange = useCallback((value: number | null) => {
    setPersonCount(value || 1);
  }, []);

  useEffect(() => {
    const fetchDynamicPrices = async () => {
      if (!id) return;

      setIsPriceLoading(true);
      const monthToFetch = selectedDate || currentViewMonth;
      try {
        const dynamicPrices = await getDynamicPrice(
          id,
          monthToFetch.startOf('month').format('YYYY-MM-DD'),
          monthToFetch.endOf('month').format('YYYY-MM-DD'),
        );
        setDynamicPrices(dynamicPrices);
      } catch (error) {
        console.error('가격 데이터 로딩 실패:', error);
        setDynamicPrices([]);
      } finally {
        setIsPriceLoading(false);
      }
    };
    fetchDynamicPrices();
  }, [selectedDate, currentViewMonth, id]);

  return (
    <div className="fixed top-1/2 right-8 z-50 -translate-y-1/2 transform rounded-2xl border-1 border-gray-300 bg-white shadow-2xl">
      <div className="flex h-auto w-85 flex-col p-6">
        <div className="flex flex-col gap-3">
          <div className="mb-5 flex items-center gap-5">
            <p className="text-xl font-bold text-gray-800">여행 예약하기</p>
            {isPriceLoading && (
              <span className="flex items-center gap-2 text-sm text-gray-500">
                <Spin size="small" />
                가격 정보 로딩 중...
              </span>
            )}
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#facc15',
                colorPrimaryHover: '#eab308',
                colorPrimaryActive: '#ca8a04',
                colorBorder: '#facc15',
              },
              components: {
                DatePicker: {
                  cellHeight: 40,
                  cellWidth: 70,
                },
              },
            }}
          >
            <Space direction="vertical" className="w-full items-center">
              <DatePicker
                onChange={onChange}
                onOpenChange={onOpenChange}
                onPanelChange={onPanelChange}
                showNow={false}
                locale={locale}
                disabledDate={disabledDate}
                size="large"
                placement="bottomRight"
                cellRender={cellRender}
                style={{ width: '250px' }}
              />
            </Space>
          </ConfigProvider>
          <div className="mx-auto mt-3 flex items-center justify-between gap-7 rounded-md border-1 border-amber-100 bg-amber-50 p-2 text-gray-800">
            <span className="text-sm">해당 날짜 1인</span>
            <span className="font-bold">
              {selectedPrice ? selectedPrice.toLocaleString() + '원' : '- 원'}
            </span>
          </div>
          <Divider />
          <div className="flex items-center gap-10 text-gray-800">
            <div className="flex items-center gap-2">
              <UserOutlined className="text-2xl" />
              <span className="text-gray-700">인원</span>
            </div>
            <InputNumber
              min={1}
              max={15}
              value={personCount}
              onChange={handlePersonCountChange}
              size="large"
              className="w-20"
            />
          </div>
          <div className="flex items-center justify-between gap-10 text-gray-800">
            <div className="flex items-center gap-2">
              <CreditCardOutlined className="text-2xl" />
              <span>총 금액</span>
            </div>
            <span className="text-xl font-bold text-red-400">
              {totalPrice ? totalPrice.toLocaleString() + '원' : '- 원'}
            </span>
          </div>
          <Button
            type="primary"
            size="large"
            className="w-ful mt-3 disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-500"
            style={{
              backgroundColor: selectedDate ? '#facc15' : undefined,
              borderColor: selectedDate ? '#facc15' : undefined,
              color: selectedDate ? '#000' : undefined,
            }}
            disabled={!selectedDate}
            onClick={handleReservation}
          >
            {isReservationLoading ? '예약 중...' : '예약하기'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReservationWidget;
