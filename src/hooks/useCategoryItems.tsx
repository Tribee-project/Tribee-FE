import { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

export const useNavigationItems = () => {
  const navigate = useNavigate();

  const domesticItems: MenuProps['items'] = [
    {
      key: '1',
      label: <div onClick={() => navigate('/jeju')}>제주도</div>,
    },
    {
      key: '2',
      label: <div onClick={() => navigate('/domestic')}>내륙/섬</div>,
    },
  ];

  const internationalItems: MenuProps['items'] = [
    {
      key: '1',
      label: <div onClick={() => navigate('/europe')}>유럽</div>,
    },
    {
      key: '2',
      label: <div onClick={() => navigate('/asia')}>동남아</div>,
    },
    {
      key: '3',
      label: <div onClick={() => navigate('/china')}>중화권</div>,
    },
    {
      key: '4',
      label: <div onClick={() => navigate('/japan')}>일본</div>,
    },
    {
      key: '5',
      label: <div onClick={() => navigate('/americas')}>괌/사이판</div>,
    },
    {
      key: '6',
      label: <div onClick={() => navigate('/australia')}>호주/뉴질랜드</div>,
    },
    {
      key: '7',
      label: <div onClick={() => navigate('/us')}>미국/하와이/캐나다</div>,
    },
  ];

  return { domesticItems, internationalItems };
};
