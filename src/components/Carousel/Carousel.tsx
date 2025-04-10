import './Carousel.css';

import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';

const Carousel: React.FC = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({
      stopOnInteraction: false,
      speed: 2,
      startDelay: 300,
      stopOnMouseEnter: true,
    }),
  ]);

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
      </div>
    </div>
  );
};

export default Carousel;
