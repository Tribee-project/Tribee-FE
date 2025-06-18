import { MenuProps } from 'antd';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCategoryItems = () => {
  const navigate = useNavigate();

  const domesticItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: <div onClick={() => navigate('/product-list/jeju')}>제주도</div>,
      },
      {
        key: '2',
        label: (
          <div onClick={() => navigate('/product-list/domestic')}>내륙/섬</div>
        ),
      },
    ],
    [navigate],
  );

  const internationalItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: <div onClick={() => navigate('/product-list/europe')}>유럽</div>,
      },
      {
        key: '2',
        label: <div onClick={() => navigate('/product-list/asia')}>동남아</div>,
      },
      {
        key: '3',
        label: (
          <div onClick={() => navigate('/product-list/china')}>중화권</div>
        ),
      },
      {
        key: '4',
        label: <div onClick={() => navigate('/product-list/japan')}>일본</div>,
      },
      {
        key: '5',
        label: (
          <div onClick={() => navigate('/product-list/americas')}>
            괌/사이판
          </div>
        ),
      },
      {
        key: '6',
        label: (
          <div onClick={() => navigate('/product-list/australia')}>
            호주/뉴질랜드
          </div>
        ),
      },
      {
        key: '7',
        label: (
          <div onClick={() => navigate('/product-list/us')}>
            미국/하와이/캐나다
          </div>
        ),
      },
    ],
    [navigate],
  );

  return { domesticItems, internationalItems };
};
