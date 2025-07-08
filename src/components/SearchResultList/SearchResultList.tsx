import './SearchResultList.css';

import { Divider, Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getSearchResult } from '@/services/apis/productsApis';
import { Product } from '@/types';

type FilterType = '여행' | '워크샵' | '투어' | '허니문' | null;

const ProductItem: React.FC<{
  product: Product;
  onClick: () => void;
}> = ({ product, onClick }) => {
  return (
    <div className="mt-20 cursor-pointer" onClick={onClick}>
      <div className="flex h-50 w-200 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
        <div>
          <img
            src={product.image[0]}
            alt={`${product.title} 상품 이미지`}
            className="h-50 w-50 object-cover"
          />
        </div>
        <div className="flex w-150 flex-col justify-between p-4">
          <div className="flex h-full flex-col justify-center p-3">
            <div className="flex flex-col">
              <span className="text-xl font-bold">
                {`${product.title} ${product.travelDays}일`}
              </span>
              <span className="text-sm text-gray-500">
                {product.startDate} ~ {product.endDate}
              </span>
            </div>
            <span className="ml-auto text-2xl font-bold text-red-400">
              {product.standardPrice.toLocaleString()}원 ~
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchResultList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getSearchResult(query || '');
      setAllProducts(products);
      setFilteredProducts(products);
    };
    fetchProducts();
  }, [query]);

  const filterProducts = (filterType: FilterType) => {
    if (selectedFilter === filterType) {
      setSelectedFilter(null);
      setFilteredProducts(allProducts);
      return;
    }

    setSelectedFilter(filterType);

    if (!filterType) {
      setFilteredProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter((product) => {
      switch (filterType) {
        case '여행':
          return (
            product.category === 'INTERNATIONAL' ||
            product.category === 'DOMESTIC'
          );
        case '허니문':
          return product.category === 'HONEYMOON';
        case '투어':
          return product.category === 'TOUR' || product.category === 'TICKET';
        case '워크샵':
          return product.category === 'WORKSHOP';
        default:
          return true;
      }
    });

    setFilteredProducts(filtered);
  };

  const getButtonClassName = (filterType: FilterType) => {
    const baseClass = 'hexagon-button';
    const selectedClass = selectedFilter === filterType ? 'selected' : '';
    return `${baseClass} ${selectedClass}`.trim();
  };

  return (
    <div className="my-25 flex w-300 flex-col items-center">
      <div className="flex items-center gap-2 text-2xl">
        <span>'</span>
        <span className="font-bold text-amber-700">{query}</span>
        <span>'</span>
        <span>검색 결과</span>
      </div>
      <div className="mt-20 flex justify-center">
        <div className="flex flex-col items-center">
          <div className="mr-18 flex gap-12">
            <button
              className={getButtonClassName('여행')}
              onClick={() => filterProducts('여행')}
            >
              여행
            </button>
            <button
              className={getButtonClassName('워크샵')}
              onClick={() => filterProducts('워크샵')}
            >
              워크샵
            </button>
          </div>
          <div className="-mt-10 ml-19 flex gap-12">
            <button
              className={getButtonClassName('투어')}
              onClick={() => filterProducts('투어')}
            >
              투어
            </button>
            <button
              className={getButtonClassName('허니문')}
              onClick={() => filterProducts('허니문')}
            >
              허니문
            </button>
          </div>
        </div>
      </div>
      <Divider className="bg-gray-300" />
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            onClick={() => navigate(`/product-detail/${product._id}`)}
          />
        ))
      ) : (
        <div className="mt-20 flex h-full w-full items-center justify-center">
          <Empty description="검색 결과가 없습니다" />
        </div>
      )}
    </div>
  );
};

export default SearchResultList;
