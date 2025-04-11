import { ClockCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';

const { Meta } = Card;

const SalesDeadline: React.FC = () => {
  return (
    <div className="flex flex-col gap-1 w-[70%] min-w-[1400px] mx-auto my-30">
      <div className="flex items-center gap-2 mb-5">
        <ClockCircleOutlined className="text-4xl" />
        <span className="text-2xl mb-0.5">마감 임박 !</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-3">
        <Card
          className="w-full h-95 cursor-pointer flex flex-col"
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        >
          <div className="flex flex-col h-full">
            <Meta
              title="가오슝 3박 4일"
              description="2025.04.15 ~ 2025.04.19"
            />
            <div className="text-2xl font-bold self-end mt-15">990,000 원~</div>
          </div>
        </Card>
        <Card
          className="w-full h-95 cursor-pointer"
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        >
          <div className="flex flex-col h-full">
            <Meta
              title="후쿠오카 3박 4일"
              description="2025.04.15 ~ 2025.04.19"
            />
            <div className="text-2xl font-bold self-end mt-15">990,000 원~</div>
          </div>
        </Card>
        <Card
          className="w-full h-95 cursor-pointer"
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        >
          <div className="flex flex-col h-full">
            <Meta title="보홀 3박 5일" description="2025.04.15 ~ 2025.04.19" />
            <div className="text-2xl font-bold self-end mt-15">990,000 원~</div>
          </div>
        </Card>
        <Card
          className="w-full h-95 cursor-pointer"
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        >
          <div className="flex flex-col h-full">
            <Meta
              title="보라카이 3박 5일"
              description="2025.04.15 ~ 2025.04.19"
            />
            <div className="text-2xl font-bold self-end mt-15">990,000 원~</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SalesDeadline;
