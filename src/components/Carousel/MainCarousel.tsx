import './MainCarousel.css';

import { Carousel } from 'antd';

const MainCarousel: React.FC = () => {
  return (
    <div className="flex justify-center w-full mt-10">
      <Carousel
        autoplay={{ dotDuration: true }}
        autoplaySpeed={3000}
        className="custom-carousel w-230 border-radius-30 overflow-hidden"
      >
        <div className="flex justify-center border-radius-30 overflow-hidden">
          <img
            src="https://cdn.pixabay.com/photo/2025/03/26/09/08/ai-generated-9494063_640.jpg"
            alt="carousel"
            className="w-230 border-radius-30 object-cover h-100"
          />
        </div>
        <div className="flex justify-center border-radius-30 overflow-hidden">
          <img
            src="https://cdn.pixabay.com/photo/2025/03/25/20/34/cat-9493147_640.jpg"
            alt="carousel"
            className="w-230 border-radius-30 object-cover h-100"
          />
        </div>
        <div className="flex justify-center border-radius-30 overflow-hidden">
          <img
            src="https://cdn.pixabay.com/photo/2025/02/20/10/38/robin-9419575_640.jpg"
            alt="carousel"
            className="w-230 border-radius-30 object-cover h-100"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default MainCarousel;
