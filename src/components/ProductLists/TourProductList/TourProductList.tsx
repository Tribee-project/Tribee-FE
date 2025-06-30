import { useEffect, useState } from 'react';

import { getTourList } from '@/services/apis/tourApis';
import { Tour } from '@/types/models/tour';

const TourProductList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('TOUR');
  const [tourList, setTourList] = useState<Tour[]>([]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchTourList = async () => {
      const response = await getTourList(activeTab);
      setTourList(response);
    };

    fetchTourList();
  }, [activeTab]);

  return (
    <div className="my-10 flex flex-col items-center gap-10">
      <div className="flex items-center gap-30 text-lg text-gray-700">
        <span
          onClick={() => handleTabClick('TOUR')}
          className={`cursor-pointer ${activeTab === 'TOUR' ? 'border-b-2 font-bold' : ''}`}
        >
          투어 상품
        </span>
        <span
          onClick={() => handleTabClick('TICKET')}
          className={`cursor-pointer ${activeTab === 'TICKET' ? 'border-b-2 font-bold' : ''}`}
        >
          입장권
        </span>
      </div>
      <div className="flex w-350 flex-wrap items-center justify-center gap-10">
        {tourList.map((tour) => (
          <div className="flex items-center gap-5" key={tour._id}>
            <div className="flex h-80 w-70 flex-col gap-3 overflow-hidden rounded-xl">
              <img
                src={tour.image[0]}
                alt="tour"
                className="h-60 w-70 overflow-hidden rounded-xl bg-gray-200 object-cover"
              />
              <div className="flex flex-col gap-2">
                <span className="text-lg">{tour.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourProductList;
