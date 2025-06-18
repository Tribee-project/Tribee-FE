import { Button, ConfigProvider, Space } from 'antd';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useCategoryItems } from '@/hooks/useCategoryItems';

const HeaderCategories: React.FC = () => {
  const { domesticItems, internationalItems } = useCategoryItems();
  const navigate = useNavigate();

  const categories = [
    {
      title: '국내여행',
      items: domesticItems,
      path: undefined,
    },
    {
      title: '해외여행',
      items: internationalItems,
      path: undefined,
    },
    {
      title: '투어/입장권',
      items: [],
      path: '/tour',
    },
    {
      title: '허니문',
      items: [],
      path: '/product-list/honeymoon',
    },
    {
      title: '워크샵',
      items: [],
      path: '/product-list/workshop',
    },
    {
      title: '이벤트',
      items: [],
      path: '/event',
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Dropdown: {
            controlItemBgHover: '#fcd34d',
          },
        },
      }}
    >
      <Space direction="vertical" className="mt-7 w-full items-center gap-10">
        <Space wrap>
          {categories.map((category, index) => (
            <Dropdown
              key={index}
              menu={{ items: category.items }}
              placement="bottom"
            >
              <Button
                size="large"
                type="text"
                onClick={
                  category.path ? () => navigate(category.path) : undefined
                }
              >
                {category.title}
              </Button>
            </Dropdown>
          ))}
        </Space>
      </Space>
    </ConfigProvider>
  );
};

export default HeaderCategories;
