import './Carousel.css';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

const Carousel: React.FC = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      stopOnInteraction: false,
      delay: 3000,
    }),
  ]);

  // 캐러셀 이미지 가운데 정렬 및 스크롤 되려면 이미지 최소 6개 필요
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <img
            src="https://scdn.ybtour.co.kr/banner/common/202504081233057291306001001040.jpg"
            alt="carousel"
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://scdn.ybtour.co.kr/banner/common/202503250347279602308056001039.jpg"
            alt="carousel"
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://scdn.ybtour.co.kr/banner/common/202504150406434572301012001014.jpg"
            alt="carousel"
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://scdn.ybtour.co.kr/banner/common/202503210729472292308056001094.jpg"
            alt="carousel"
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://scdn.ybtour.co.kr/banner/common/202504010503251942301012001065.jpg"
            alt="carousel"
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://scdn.ybtour.co.kr/banner/common/202504110909166242308056001025.jpg"
            alt="carousel"
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
