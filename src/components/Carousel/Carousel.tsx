import './Carousel.css';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

import { Event } from '@/types/models/event';

import { getEventList } from '../../services/apis/EventApis';

const Carousel: React.FC = () => {
  const [eventList, setEventList] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEventList = async () => {
      const res = await getEventList('ACTIVE');
      setEventList(res);
    };

    fetchEventList();
  }, []);

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      containScroll: false,
      slidesToScroll: 1,
      inViewThreshold: 0,
    },
    [
      Autoplay({
        stopOnInteraction: false,
        delay: 3000,
      }),
    ],
  );

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {eventList.map((event, index) => (
          <div className="embla__slide" key={index}>
            <img src={event.image} alt={`carousel-${index + 1}`} />
            <div className="embla__slide__title">{event.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
