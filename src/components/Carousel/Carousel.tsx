import './Carousel.css';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

const Carousel: React.FC = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      delay: 3000,
    }),
  ]);

  // 캐러셀 이미지 가운데 정렬 및 스크롤 되려면 이미지 최소 6개 필요
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <img
            src="https://cdn.pixabay.com/photo/2025/03/26/09/08/ai-generated-9494063_640.jpg"
            alt="carousel"
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://cdn.pixabay.com/photo/2025/03/25/20/34/cat-9493147_640.jpg"
            alt="carousel"
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://cdn.pixabay.com/photo/2025/02/20/10/38/robin-9419575_640.jpg"
            alt="carousel"
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://cdn.pixabay.com/photo/2020/08/24/21/44/man-5515150_640.jpg"
            alt="carousel"
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://cdn.pixabay.com/photo/2022/05/22/16/49/outdoors-7213951_640.jpg"
            alt="carousel"
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://cdn.pixabay.com/photo/2025/04/08/10/42/landscape-9521261_1280.jpg"
            alt="carousel"
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
