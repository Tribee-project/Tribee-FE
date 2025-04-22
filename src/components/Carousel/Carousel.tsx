import './Carousel.css';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

const Carousel: React.FC = () => {
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

  const carouselImages = [
    'https://scdn.ybtour.co.kr/banner/common/202504081233057291306001001040.jpg',
    'https://scdn.ybtour.co.kr/banner/common/202503250347279602308056001039.jpg',
    'https://scdn.ybtour.co.kr/banner/common/202504150406434572301012001014.jpg',
    'https://scdn.ybtour.co.kr/banner/common/202503210729472292308056001094.jpg',
    'https://scdn.ybtour.co.kr/banner/common/202504010503251942301012001065.jpg',
    'https://scdn.ybtour.co.kr/banner/common/202504110909166242308056001025.jpg',
  ];

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {carouselImages.map((imageUrl, index) => (
          <div className="embla__slide" key={index}>
            <img src={imageUrl} alt={`carousel-${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
