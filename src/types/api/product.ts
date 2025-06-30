import { Product } from '../models/product';

export interface ProductListResponse {
  data: Product[];
  total?: number;
}

export interface ProductDetailResponse {
  data: Product;
}

export interface ProductsByAreaParams {
  area: string;
}

export interface QueryParams {
  area: string;
  params: {
    travelDays?: number;
    startDate?: string;
    area2?: string;
  };
}
