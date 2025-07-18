import ProductDetail from '@/components/ProductDetail/ProductDetail';
import ReservationWidget from '@/components/ReservationWidget/ReservationWidget';
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';

const ProductDetailPage: React.FC = () => {
  return (
    <div className="flex w-screen flex-col gap-1">
      <div className="flex flex-col items-center gap-1">
        <Header />
      </div>
      <div className="flex justify-center">
        <ProductDetail />
      </div>
      <ReservationWidget />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
