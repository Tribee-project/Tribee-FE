import MainCarousel from '@/components/Carousel/MainCarousel';
import Header from '@/layouts/Header/Header';

const MainPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-1 w-screen">
      <div className="flex flex-col gap-1 items-center">
        <Header />
      </div>
      <MainCarousel />
    </div>
  );
};

export default MainPage;
