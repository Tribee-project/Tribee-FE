import { Outlet } from 'react-router-dom';

import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';

const ProductListPage: React.FC = () => {
  return (
    <div className="flex w-screen flex-col gap-1">
      <div className="flex flex-col items-center gap-1">
        <Header />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default ProductListPage;
