export interface Review {
  content: string;
  createdAt: string;
  id: string;
  prodId: string;
  productTitle: string;
  reservation: {
    category: string;
    cost: number;
    departureDate: string;
    id: string;
    isReviewed: boolean;
    personnel: number;
    prodId: string;
    reservationDate: string;
    status: number;
    userId: string;
  };
  updatedAt: string;
  userId: string;
}
