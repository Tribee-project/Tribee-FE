import 'dayjs/locale/ko';

import {
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Divider,
  Table,
  Tag,
} from 'antd';
import { Space } from 'antd';
import locale from 'antd/locale/ko_KR';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { getUserBooked } from '@/services/apis/userApis';
import type { Product, UserBooked } from '@/types';

dayjs.locale('ko');

const UserBooked: React.FC = () => {
  const [bookingData, setBookingData] = useState<UserBooked[]>([]);
  const [originalData, setOriginalData] = useState<UserBooked[]>([]);

  const handleDateChange: DatePickerProps['onChange'] = (date) => {
    if (date) {
      const filteredData = originalData.filter((booking) => {
        return dayjs(booking.reservationDate).isSame(date, 'year');
      });
      setBookingData(filteredData);
    } else {
      setBookingData(originalData);
    }
  };

  useEffect(() => {
    getUserBooked().then((data) => {
      setOriginalData(data);
      setBookingData(data);
    });
  }, []);

  const columns = [
    {
      title: '예약 날짜',
      dataIndex: 'reservationDate',
      key: 'reservationDate',
      width: 60,
      align: 'center' as const,
      render: (reservationDate: string) =>
        dayjs(reservationDate).format('YYYY-MM-DD'),
    },
    {
      title: '예약 코드',
      dataIndex: 'id',
      key: 'id',
      width: 40,
      align: 'center' as const,
      render: (id: string) => id.split('-')[0].toUpperCase(),
    },
    {
      title: '상품명',
      dataIndex: 'product',
      key: 'product',
      width: 250,
      align: 'center' as const,
      render: (product: Product) => `${product.title}`,
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
    {
      title: '인원',
      dataIndex: 'personnel',
      key: 'personnel',
      width: 20,
      align: 'center' as const,
      render: (personnel: number) => `${personnel}명`,
    },
    {
      title: '가격',
      dataIndex: 'cost',
      key: 'cost',
      width: 50,
      align: 'center' as const,
      render: (cost: number) => `${cost.toLocaleString()}원`,
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 30,
      align: 'center' as const,
      onCell: () => ({
        style: {
          textAlign: 'center' as const,
          verticalAlign: 'middle' as const,
          padding: '8px 4px',
        },
      }),
      render: (status: number) => {
        let color = '';
        let text = '';

        switch (status) {
          case 0:
            color = 'green';
            text = '확정';
            break;
          case 1:
            color = 'red';
            text = '취소';
            break;
        }

        return (
          <Tag color={color} style={{ margin: 0 }}>
            {text}
          </Tag>
        );
      },
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
                placeholder="예약 년도"
                size="middle"
                style={{ width: '10%' }}
              />
            </Space>
            <Divider />
            <div>
              <Table
                dataSource={bookingData}
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

export default UserBooked;
