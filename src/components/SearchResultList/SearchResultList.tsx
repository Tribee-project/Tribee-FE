import './SearchResultList.css';

import { ConfigProvider, DatePicker, Divider, Space } from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';
import React from 'react';

const { RangePicker } = DatePicker;

const SearchResultList: React.FC = () => {
  return (
    <div className="my-25 flex w-300 flex-col items-center">
      <div className="flex items-center gap-2 text-2xl">
        <span>'</span>
        <span className="font-bold text-amber-700">일본</span>
        <span>'</span>
        <span>검색 결과</span>
      </div>
      <div className="mt-20 flex items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <span>출발 가능 일자</span>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#fbbf24',
                colorPrimaryHover: '#f59e0b',
                colorPrimaryActive: '#d97706',
              },
            }}
          >
            <Space direction="vertical" size={12}>
              <RangePicker locale={locale} size="large" />
            </Space>
          </ConfigProvider>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex gap-12">
            <button className="hexagon-button">여행</button>
            <button className="hexagon-button">워크샵</button>
          </div>
          <div className="-mt-10 ml-37 flex gap-12">
            <button className="hexagon-button">투어</button>
            <button className="hexagon-button">허니문</button>
          </div>
        </div>
      </div>
      <Divider className="bg-gray-300" />
      <div className="mt-20">
        <div className="flex h-40 w-200 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1590559899731-a382839e5549?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8JUVDJTk4JUE0JUVDJTgyJUFDJUVDJUI5JUI0fGVufDB8fDB8fHww"
            alt="product"
            className="h-40 w-50 object-cover"
          />
          <div className="flex flex-col justify-center p-5">
            <span className="text-xl font-bold">
              오사카 여행#오사카성#벚꽃#도톤보리
            </span>
            <span className="text-sm text-gray-500">
              2025.07.01 ~ 2025.07.05
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultList;
