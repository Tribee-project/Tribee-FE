import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import UserPageButtons from '@/components/UserPageButtons/UserPageButtons';
import useAuth from '@/hooks/useAuth';
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';

const UserPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    isAuthenticated();
  }, [isAuthenticated]);

  return (
    <div className="flex w-screen flex-col gap-1">
      <div className="flex flex-col items-center gap-1">
        <Header />
        <UserPageButtons />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserPage;
