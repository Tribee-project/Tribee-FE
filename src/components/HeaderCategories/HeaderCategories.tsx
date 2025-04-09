import { Button, Space } from 'antd';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useCategoryItems } from '@/hooks/useCategoryItems';

const HeaderCategories: React.FC = () => {
  const { domesticItems, internationalItems } = useCategoryItems();
  const navigate = useNavigate();

  return (
    <Space direction="vertical" className="w-full items-center mt-12 gap-10">
      <Space wrap>
        <Dropdown menu={{ items: domesticItems }} placement="bottom">
          <Button size="large" type="text">
            해외여행
          </Button>
        </Dropdown>
        <Dropdown menu={{ items: internationalItems }} placement="bottom">
          <Button size="large" type="text">
            국내여행
          </Button>
        </Dropdown>
        <Dropdown menu={{ items: [] }} placement="bottom">
          <Button size="large" type="text" onClick={() => navigate('/tour')}>
            투어/입장권
          </Button>
        </Dropdown>
        <Dropdown menu={{ items: [] }} placement="bottom">
          <Button
            size="large"
            type="text"
            onClick={() => navigate('/honeymoon')}
          >
            허니문
          </Button>
        </Dropdown>
        <Dropdown menu={{ items: [] }} placement="bottom">
          <Button
            size="large"
            type="text"
            onClick={() => navigate('/workshop')}
          >
            워크샵
          </Button>
        </Dropdown>
        <Dropdown menu={{ items: [] }} placement="bottom">
          <Button size="large" type="text" onClick={() => navigate('/event')}>
            이벤트
          </Button>
        </Dropdown>
      </Space>
    </Space>
  );
};

export default HeaderCategories;
