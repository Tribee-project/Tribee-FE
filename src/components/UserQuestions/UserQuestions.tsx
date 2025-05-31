import { Collapse, CollapseProps, ConfigProvider } from 'antd';

import questionList from '@/constant/questionList';

const items: CollapseProps['items'] = questionList.map((question) => ({
  key: question.key,
  label: question.label,
  children: <p>{question.children}</p>,
}));

const UserQuestions: React.FC = () => {
  return (
    <div className="mt-10 mb-10 w-250 self-center">
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 5,
          },
          components: {
            Collapse: {
              contentBg: '#FEF3D0',
            },
          },
        }}
      >
        <Collapse accordion size="large" items={items} />
      </ConfigProvider>
    </div>
  );
};

export default UserQuestions;
