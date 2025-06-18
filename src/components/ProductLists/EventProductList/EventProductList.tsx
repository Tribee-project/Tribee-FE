import { useState } from 'react';

const EventProductList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('inProgress');

  return (
    <div className="my-10 flex flex-col items-center gap-10">
      <div className="flex items-center gap-30 text-lg text-gray-700">
        <span
          id="inProgress"
          onClick={() => setActiveTab('inProgress')}
          className={`cursor-pointer ${activeTab === 'inProgress' ? 'border-b-2 font-bold' : ''}`}
        >
          진행중인 이벤트
        </span>
        <span
          id="ended"
          onClick={() => setActiveTab('ended')}
          className={`cursor-pointer ${activeTab === 'ended' ? 'border-b-2 font-bold' : ''}`}
        >
          종료된 이벤트
        </span>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex h-80 w-70 flex-col gap-3 overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1678284949278-331408757729?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="event"
            className="h-60 w-70 rounded-xl object-cover"
          />
          <div className="flex flex-col gap-2">
            <span className="text-lg">🐝트리비 런칭 기념 이벤트!</span>
            <span className="text-sm text-gray-600">
              2025.06.18 ~ 2025.06.20
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventProductList;
