import { useEffect, useState } from 'react';

import { getEventList } from '@/services/apis/EventApis';
import { Event } from '@/types/models/event';

const EventProductList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ACTIVE');
  const [eventList, setEventList] = useState<Event[]>([]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchEventList = async () => {
      const response = await getEventList(activeTab);
      setEventList(response);
    };

    fetchEventList();
  }, [activeTab]);

  return (
    <div className="my-10 flex flex-col items-center gap-10">
      <div className="flex items-center gap-30 text-lg text-gray-700">
        <span
          onClick={() => handleTabClick('ACTIVE')}
          className={`cursor-pointer ${activeTab === 'ACTIVE' ? 'border-b-2 font-bold' : ''}`}
        >
          진행중인 이벤트
        </span>
        <span
          onClick={() => handleTabClick('ENDED')}
          className={`cursor-pointer ${activeTab === 'ENDED' ? 'border-b-2 font-bold' : ''}`}
        >
          종료된 이벤트
        </span>
      </div>
      <div className="flex w-350 flex-wrap items-center justify-center gap-10">
        {eventList.map((event) => (
          <div className="flex items-center gap-5" key={event._id}>
            <div className="flex h-80 w-70 flex-col gap-3 overflow-hidden rounded-xl">
              <img
                src={event.image[0]}
                alt="event"
                className="h-60 w-70 overflow-hidden rounded-xl bg-gray-200 object-cover"
              />
              <div className="flex flex-col gap-2">
                <span className="text-lg">{event.title}</span>
                <span className="text-sm text-gray-600">
                  {new Date(event.startDate).toLocaleDateString()} ~{' '}
                  {new Date(event.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventProductList;
