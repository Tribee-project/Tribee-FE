export interface ReviewRequest {
  reserveId: string;
  content: string;
}

export interface UpdateReviewRequest {
  reviewId: string;
  content: string;
}
