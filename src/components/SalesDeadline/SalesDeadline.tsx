import { ClockCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';

const { Meta } = Card;

const SalesDeadline: React.FC = () => {
  return (
    <div className="mx-auto my-30 flex w-[70%] min-w-[1400px] flex-col gap-1">
      <div className="mb-5 flex items-center gap-2">
        <ClockCircleOutlined className="text-4xl" />
        <span className="mb-0.5 text-2xl">마감 임박 !</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-3">
        <Card
          className="flex h-95 w-full cursor-pointer flex-col"
          cover={
            <img
              className="h-50"
              alt="example"
              src="https://dimgcdn.ybtour.co.kr/TN/99/99c7de21a6689ea02c0a364a0f093db1.tn.410x280.jpg"
            />
          }
        >
          <div className="flex h-full flex-col">
            <Meta
              title="가오슝 3박 4일"
              description="2025.04.15 ~ 2025.04.19"
            />
            <div className="mt-15 self-end text-2xl font-bold">990,000 원~</div>
          </div>
        </Card>
        <Card
          className="h-95 w-full cursor-pointer"
          cover={
            <img
              className="h-50"
              alt="example"
              src="https://dimgcdn.ybtour.co.kr/TN/db/db66c10756bb75e15c3cc880710fc76b.tn.410x280.jpg"
            />
          }
        >
          <div className="flex h-full flex-col">
            <Meta
              title="후쿠오카 3박 4일"
              description="2025.04.15 ~ 2025.04.19"
            />
            <div className="mt-15 self-end text-2xl font-bold">990,000 원~</div>
          </div>
        </Card>
        <Card
          className="h-95 w-full cursor-pointer"
          cover={
            <img
              className="h-50"
              alt="example"
              src="https://dimgcdn.ybtour.co.kr/TN/f5/f5405973faa747b701e524edf2bcd37e.tn.410x280.jpg"
            />
          }
        >
          <div className="flex h-full flex-col">
            <Meta title="보홀 3박 5일" description="2025.04.15 ~ 2025.04.19" />
            <div className="mt-15 self-end text-2xl font-bold">990,000 원~</div>
          </div>
        </Card>
        <Card
          className="h-95 w-full cursor-pointer"
          cover={
            <img
              className="h-50"
              alt="example"
              src="https://dimgcdn.ybtour.co.kr/TN/f5/f5950faa08b674242bdd441da9c955ec.tn.630x410.jpg"
            />
          }
        >
          <div className="flex h-full flex-col">
            <Meta
              title="보라카이 3박 5일"
              description="2025.04.15 ~ 2025.04.19"
            />
            <div className="mt-15 self-end text-2xl font-bold">990,000 원~</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SalesDeadline;
