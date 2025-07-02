import {
  Button,
  Card,
  ConfigProvider,
  Divider,
  Input,
  message,
  Modal,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { createReview, updateReview } from '@/services/apis/userApis';
import { Review, UserBooked } from '@/types';
import type { ReviewRequest, UpdateReviewRequest } from '@/types/api/review';

const { TextArea } = Input;

const ReviewWidget = ({
  isModalOpen,
  booking,
  handleCancel,
  myReviews,
  onReviewUpdate,
}: {
  isModalOpen: boolean;
  handleCancel: () => void;
  booking: UserBooked;
  myReviews: Review[];
  onReviewUpdate: () => Promise<void>;
}) => {
  const [review, setReview] = useState<ReviewRequest>({
    reserveId: booking.id,
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const existingReview = myReviews.find((r) => r.reservation.id === booking.id);

  useEffect(() => {
    if (existingReview) {
      setReview({
        reserveId: booking.id,
        content: existingReview.content,
      });
    } else {
      setReview({
        reserveId: booking.id,
        content: '',
      });
    }
  }, [booking.id, existingReview]);

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview({ ...review, content: e.target.value });
  };

  const handleReviewSubmit = async () => {
    if (review.content.trim().length === 0) {
      message.error('리뷰를 작성해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (existingReview) {
        const updateData: UpdateReviewRequest = {
          reviewId: existingReview.id,
          content: review.content,
        };
        await updateReview(updateData);
        message.success('리뷰가 성공적으로 수정되었습니다.');
      } else {
        await createReview(review);
        message.success('리뷰가 성공적으로 작성되었습니다.');
      }
      await onReviewUpdate();
      handleCancel();
    } catch (error) {
      if (existingReview) {
        message.error('리뷰 수정 중 오류가 발생했습니다.');
        console.error('리뷰 수정 오류:', error);
      } else {
        message.error('리뷰 작성 중 오류가 발생했습니다.');
        console.error('리뷰 작성 오류:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalCancel = () => {
    if (existingReview) {
      setReview({
        reserveId: booking.id,
        content: existingReview.content,
      });
    } else {
      setReview({
        reserveId: booking.id,
        content: '',
      });
    }
    handleCancel();
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultHoverBorderColor: '#FECA3A',
            defaultHoverBg: '#FECA3A',
            defaultHoverColor: '#eee',
          },
          Input: {
            activeBorderColor: '#FECA3A',
            hoverBorderColor: '#FECA3A',
            activeShadow: '0 4px 12px rgba(254, 202, 58, 0.4)',
          },
        },
      }}
    >
      <Modal
        open={isModalOpen}
        closable={{ 'aria-label': 'Custom Close Button' }}
        onCancel={handleModalCancel}
        footer={null}
        destroyOnClose={true}
        width={600}
        title={
          <div className="text-xl font-bold">
            {existingReview ? '리뷰 수정' : '리뷰 작성'}
          </div>
        }
      >
        <div className="flex flex-col">
          <Card className="mb-4" size="small">
            <div className="space-y-2">
              <div className="text-lg font-semibold">
                {booking.product.title}
              </div>
              <div className="text-sm text-gray-600">
                <div>
                  출국일: {dayjs(booking.departureDate).format('YYYY-MM-DD')}
                </div>
                <div>인원: {booking.personnel}명</div>
                <div>
                  예약일: {dayjs(booking.reservationDate).format('YYYY-MM-DD')}
                </div>
              </div>
            </div>
          </Card>

          {existingReview && (
            <>
              <div className="mt-4 mb-1">
                <span className="text-sm font-medium text-gray-700">
                  기존 리뷰 (작성일:{' '}
                  {dayjs(existingReview.createdAt).format('YYYY-MM-DD HH:mm')})
                </span>
              </div>
              <Card className="mb-4 bg-gray-50" size="small">
                <div className="text-sm whitespace-pre-wrap">
                  {existingReview.content}
                </div>
              </Card>
              <Divider />
            </>
          )}

          <div className="mb-1">
            <span className="text-sm font-medium text-gray-700">
              {existingReview ? '리뷰 수정' : '리뷰 작성'}
            </span>
          </div>
          <TextArea
            rows={6}
            value={review.content}
            onChange={handleReviewChange}
            placeholder={
              existingReview
                ? '기존 리뷰를 수정해주세요...'
                : '여행 후기를 작성해주세요...'
            }
            className="mb-4"
          />

          <div className="mt-4 flex justify-end gap-2">
            <Button onClick={handleModalCancel} disabled={isSubmitting}>
              취소
            </Button>
            <Button
              type="primary"
              onClick={handleReviewSubmit}
              loading={isSubmitting}
              style={{
                backgroundColor: '#FECA3A',
                borderColor: '#FECA3A',
                color: '#000',
              }}
            >
              {existingReview ? '수정하기' : '작성하기'}
            </Button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default ReviewWidget;
