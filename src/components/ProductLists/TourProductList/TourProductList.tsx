import { useState } from 'react';

const TourProductList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tour');
  return (
    <div className="my-10 flex flex-col items-center gap-10">
      <div className="flex items-center gap-30 text-lg text-gray-700">
        <span
          onClick={() => setActiveTab('tour')}
          className={`cursor-pointer ${activeTab === 'tour' ? 'border-b-2 font-bold' : ''}`}
        >
          투어 상품
        </span>
        <span
          onClick={() => setActiveTab('ticket')}
          className={`cursor-pointer ${activeTab === 'ticket' ? 'border-b-2 font-bold' : ''}`}
        >
          입장권
        </span>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex h-80 w-70 flex-col gap-3 overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1617089268741-035d1a43fad9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8JUVCJUIyJTlBJUVBJUJEJTgzfGVufDB8fDB8fHww"
            alt="event"
            className="h-60 w-70 rounded-xl object-cover"
          />
          <div className="flex flex-col gap-2">
            <span className="text-lg">🌸오사카 봄맞이 벚꽃 투어!</span>
            <span className="text-sm text-gray-600">
              2025.06.18 ~ 2025.06.20
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourProductList;
