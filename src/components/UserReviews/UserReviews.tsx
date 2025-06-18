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

import { Product } from '@/types';

dayjs.locale('ko');

const reviewsData = [
  {
    id: '1',
    reservationDate: '2024-01-01',
    product: {
      title: '오사카 여행',
    },
    review: '오사카 여행 후기 입니다~',
    departureDate: '2024-04-01',
  },
];

const handleDateChange: DatePickerProps['onChange'] = () => {};

const UserReviews: React.FC = () => {
  const columns = [
    {
      title: '작성 날짜',
      dataIndex: 'reservationDate',
      key: 'reservationDate',
      width: 30,
      align: 'center' as const,
      render: (reservationDate: string) =>
        dayjs(reservationDate).format('YYYY-MM-DD'),
    },
    {
      title: '예약 코드',
      dataIndex: 'id',
      key: 'id',
      width: 30,
      align: 'center' as const,
      render: (id: string) => id.split('-')[0].toUpperCase(),
    },
    {
      title: '상품명',
      dataIndex: 'product',
      key: 'product',
      width: 150,
      align: 'center' as const,
      ellipsis: true,
      render: (product: Product) => product.title,
    },
    {
      title: '후기',
      dataIndex: 'review',
      key: 'review',
      width: 250,
      align: 'center' as const,
      ellipsis: true,
    },
    {
      title: '출국일',
      dataIndex: 'departureDate',
      key: 'departureDate',
      width: 50,
      align: 'center' as const,
      render: (departureDate: string) =>
        dayjs(departureDate).format('YYYY-MM-DD'),
    },
  ];

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
