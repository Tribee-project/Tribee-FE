import Carousel from '@/components/Carousel/Carousel';
import SalesDeadline from '@/components/SalesDeadline/SalesDeadline';
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';

const MainPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-1 w-screen">
      <div className="flex flex-col gap-1 items-center">
        <Header />
      </div>
      <Carousel />
      <SalesDeadline />
      <Footer />
    </div>
  );
};

export default MainPage;
