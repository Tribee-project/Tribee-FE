import 'dayjs/locale/ko';

import {
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Divider,
  Space,
  Table,
} from 'antd';
import locale from 'antd/locale/ko_KR';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import { getUserReviews } from '@/services/apis/userApis';
import { Review } from '@/types';
import { Reservation } from '@/types/models/reservation';

dayjs.locale('ko');

const handleDateChange: DatePickerProps['onChange'] = () => {};

const UserReviews: React.FC = () => {
  const [reviewsData, setReviewsData] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await getUserReviews();
      setReviewsData(reviews);
    };
    fetchReviews();
  }, []);

  console.log(reviewsData);

  const columns = useMemo(
    () => [
      {
        title: '작성 날짜',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 30,
        align: 'center' as const,
        render: (createdAt: string) => dayjs(createdAt).format('YYYY-MM-DD'),
      },
      {
        title: '예약 코드',
        dataIndex: 'reservation',
        key: 'reservation',
        width: 30,
        align: 'center' as const,
        render: (reservation: Reservation) =>
          reservation.id.split('-')[0].toUpperCase(),
      },
      {
        title: '상품명',
        dataIndex: 'productTitle',
        key: 'productTitle',
        width: 150,
        align: 'center' as const,
        ellipsis: true,
        render: (productTitle: string) => productTitle,
      },
      {
        title: '후기',
        dataIndex: 'content',
        key: 'content',
        width: 250,
        align: 'center' as const,
        ellipsis: true,
        render: (content: string) => content,
      },
      {
        title: '출국일',
        dataIndex: 'reservation',
        key: 'reservation',
        width: 50,
        align: 'center' as const,
        render: (reservation: Reservation) =>
          dayjs(reservation.departureDate).format('YYYY-MM-DD'),
      },
    ],
    [],
  );

  return (
    <div className="mt-10 mb-10 flex flex-col items-center">
      <div className="w-400 rounded-md bg-gray-100 p-5 shadow-md">
        <div className="p-4">
          <ConfigProvider
            locale={locale}
            theme={{
              components: {
                DatePicker: {
                  activeBorderColor: '#FECA3A',
                  hoverBorderColor: '#FECA3A',
                },
                Table: {
                  headerBg: '#FEDB6B',
                  headerColor: '#000',
                },
              },
            }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <DatePicker
                onChange={handleDateChange}
                picker="year"
                placeholder="작성 년도"
                size="middle"
                style={{ width: '10%' }}
              />
            </Space>
            <Divider />
            <div>
              <Table
                dataSource={reviewsData}
                columns={columns}
                rowKey="id"
                pagination={false}
                size="middle"
                tableLayout="fixed"
                scroll={{ x: 'max-content' }}
                className="overflow-hidden rounded-xl"
              />
            </div>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;
