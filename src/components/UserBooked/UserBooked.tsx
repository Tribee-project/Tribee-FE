import 'dayjs/locale/ko';

import {
  Button,
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
import { useCallback, useEffect, useMemo, useState } from 'react';

import { getUserBooked, getUserReviews } from '@/services/apis/userApis';
import type { Product, Review, UserBooked } from '@/types';

import ReviewWidget from '../ReviewWidget/ReviewWidget';

dayjs.locale('ko');

const UserBooked: React.FC = () => {
  const [bookingData, setBookingData] = useState<UserBooked[]>([]);
  const [originalData, setOriginalData] = useState<UserBooked[]>([]);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<UserBooked | null>(
    null,
  );
  const [myReviews, setMyReviews] = useState<Review[]>([]);

  const handleDateChange: DatePickerProps['onChange'] = useCallback(
    (date: dayjs.Dayjs | null) => {
      if (date) {
        const filteredData = originalData.filter((booking) => {
          return dayjs(booking.reservationDate).isSame(date, 'year');
        });
        setBookingData(filteredData);
      } else {
        setBookingData(originalData);
      }
    },
    [originalData],
  );

  useEffect(() => {
    getUserBooked().then((data) => {
      setOriginalData(data);
      setBookingData(data);
    });

    const fetchReviews = async () => {
      const reviewData = await getUserReviews();
      setMyReviews(reviewData);
    };
    fetchReviews();
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  }, []);

  const handleReviewUpdate = useCallback(async () => {
    try {
      const reviewData = await getUserReviews();
      setMyReviews(reviewData);
    } catch (error) {
      console.error('리뷰 데이터 업데이트 오류:', error);
    }
  }, []);

  const handleRowMouseEnter = useCallback((record: UserBooked) => {
    if (record.status === 0) {
      setHoveredRowId(record.id);
    }
  }, []);

  const handleRowMouseLeave = useCallback(() => {
    setHoveredRowId(null);
  }, []);

  const handleWriteReview = useCallback((booking: UserBooked) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  }, []);

  const renderReservationDate = useCallback(
    (reservationDate: string) => dayjs(reservationDate).format('YYYY-MM-DD'),
    [],
  );

  const renderReservationCode = useCallback(
    (id: string) => id.split('-')[0].toUpperCase(),
    [],
  );

  const renderProductTitle = useCallback(
    (product: Product) => product.title,
    [],
  );

  const renderDepartureDate = useCallback(
    (departureDate: string) => dayjs(departureDate).format('YYYY-MM-DD'),
    [],
  );

  const renderPersonnel = useCallback(
    (personnel: number) => `${personnel}명`,
    [],
  );

  const renderCost = useCallback(
    (cost: number) => `${cost.toLocaleString()}원`,
    [],
  );

  const renderStatus = useCallback((status: number) => {
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
  }, []);

  const columns = useMemo(
    () => [
      {
        title: '예약 날짜',
        dataIndex: 'reservationDate',
        key: 'reservationDate',
        width: 60,
        align: 'center' as const,
        render: renderReservationDate,
      },
      {
        title: '예약 코드',
        dataIndex: 'id',
        key: 'id',
        width: 40,
        align: 'center' as const,
        render: renderReservationCode,
      },
      {
        title: '상품명',
        dataIndex: 'product',
        key: 'product',
        width: 250,
        align: 'center' as const,
        ellipsis: true,
        render: renderProductTitle,
      },
      {
        title: '출국일',
        dataIndex: 'departureDate',
        key: 'departureDate',
        width: 50,
        align: 'center' as const,
        render: renderDepartureDate,
      },
      {
        title: '인원',
        dataIndex: 'personnel',
        key: 'personnel',
        width: 20,
        align: 'center' as const,
        render: renderPersonnel,
      },
      {
        title: '가격',
        dataIndex: 'cost',
        key: 'cost',
        width: 50,
        align: 'center' as const,
        render: renderCost,
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
        render: renderStatus,
      },
    ],
    [
      renderReservationDate,
      renderReservationCode,
      renderProductTitle,
      renderDepartureDate,
      renderPersonnel,
      renderCost,
      renderStatus,
    ],
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
                placeholder="예약 년도"
                size="middle"
                style={{ width: '10%' }}
              />
            </Space>
            <Divider />
            <div
              style={{ position: 'relative' }}
              onMouseLeave={handleRowMouseLeave}
            >
              <Table
                dataSource={bookingData}
                columns={columns}
                rowKey="id"
                pagination={false}
                size="middle"
                tableLayout="fixed"
                scroll={{ x: 'max-content' }}
                className="overflow-hidden rounded-xl"
                onRow={(record) => ({
                  onMouseEnter: (e) => {
                    e.stopPropagation();
                    handleRowMouseEnter(record);
                  },
                  style: {
                    backgroundColor:
                      hoveredRowId === record.id
                        ? 'rgba(0, 0, 0, 0.15)'
                        : 'transparent',
                    cursor: record.status === 0 ? 'pointer' : 'default',
                    transition: 'background-color 0.3s ease',
                    position: 'relative',
                  },
                })}
              />
              {hoveredRowId && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none',
                    zIndex: 1000,
                  }}
                >
                  {bookingData.map((booking, index) => {
                    if (booking.id !== hoveredRowId) {
                      return null;
                    }

                    const rowHeight = 47;
                    const headerHeight = 47;
                    const topPosition = headerHeight + index * rowHeight;

                    const hasExistingReview = myReviews.some(
                      (review) => review.reservation.id === booking.id,
                    );

                    return (
                      <div
                        key={booking.id}
                        style={{
                          position: 'absolute',
                          top: `${topPosition}px`,
                          left: 0,
                          right: 0,
                          height: `${rowHeight}px`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          pointerEvents: 'auto',
                          backgroundColor: 'rgba(0, 0, 0, 0.2)',
                          zIndex: 1001,
                          overflow: 'hidden',
                          borderRadius:
                            index === 0
                              ? '0'
                              : index === bookingData.length - 1
                                ? '0 0 12px 12px'
                                : '0',
                        }}
                      >
                        <Button
                          type="primary"
                          onClick={() => handleWriteReview(booking)}
                          style={{
                            backgroundColor: '#FECA3A',
                            borderColor: '#FECA3A',
                            color: '#000',
                            fontSize: '14px',
                            height: '30px',
                            boxShadow: '0 4px 12px rgba(254, 202, 58, 0.4)',
                            border: '1px solid #fff',
                          }}
                          onMouseEnter={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          {hasExistingReview
                            ? '리뷰 수정하기'
                            : '리뷰 작성하기'}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </ConfigProvider>
        </div>
      </div>
      {selectedBooking && (
        <ReviewWidget
          isModalOpen={isModalOpen}
          booking={selectedBooking}
          handleCancel={handleCancel}
          myReviews={myReviews}
          onReviewUpdate={handleReviewUpdate}
        />
      )}
    </div>
  );
};

export default UserBooked;
