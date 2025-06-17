import 'dayjs/locale/ko';

import { ConfigProvider, DatePicker, DatePickerProps, Space, Spin } from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getDynamicPrice } from '@/services/apis/priceApis';
import { DynamicPrice } from '@/types/api/price';

const ReservationWidget = () => {
  const [dynamicPrices, setDynamicPrices] = useState<DynamicPrice[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [currentViewMonth, setCurrentViewMonth] = useState<Dayjs>(dayjs());
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const { id } = useParams();

  const onChange: DatePickerProps['onChange'] = (date) => {
    setSelectedDate(date);
    console.log(date?.format('YYYY-MM-DD'));
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setCurrentViewMonth(dayjs());
    }
  };

  const disabledDate: DatePickerProps['disabledDate'] = (current) => {
    const today = dayjs();
    const sevenDaysLater = today.add(7, 'day');
    const fiveMonthsLater = today.add(5, 'month');

    return current && (current <= sevenDaysLater || current >= fiveMonthsLater);
  };

  const cellRender: DatePickerProps['cellRender'] = (current) => {
    if (!dayjs.isDayjs(current)) return <div>{current}</div>;

    const today = dayjs();
    const sevenDaysLater = today.add(7, 'day');
    const fiveMonthsLater = today.add(5, 'month');
    const isDisabled =
      current && (current <= sevenDaysLater || current >= fiveMonthsLater);

    const viewingMonth = currentViewMonth;
    const isDifferentMonth = !current.isSame(viewingMonth, 'month');

    if (current.date() === 15 && !current.isSame(currentViewMonth, 'month')) {
      setCurrentViewMonth(current);
    }

    const averagePrice =
      dynamicPrices.length > 0
        ? dynamicPrices.reduce((sum, item) => sum + item.price, 0) /
          dynamicPrices.length
        : 0;

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
  };

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
    <div className="fixed top-1/3 right-8 z-50 -translate-y-1/2 transform rounded-2xl border-1 border-gray-300 bg-white shadow-2xl">
      <div className="flex h-auto w-90 flex-col gap-7 p-6">
        <div className="flex items-center gap-5">
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
      </div>
    </div>
  );
};

export default ReservationWidget;
