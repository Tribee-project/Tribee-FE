import AuthButtons from '@/components/AuthButtons/AuthButtons';
import HeaderCategories from '@/components/HeaderCategories/HeaderCategories';
import SearchBar from '@/components/SearchBar/SearchBar';
import UserInfoButtons from '@/components/UserInfoButtons/UserInfoButtons';

const Header: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-1 items-center h-55 w-280">
        <AuthButtons />
        <div className="flex w-full items-center justify-between">
          <SearchBar />
          <UserInfoButtons />
        </div>
        <HeaderCategories />
      </div>
      <div className="w-screen border-b-3 border-amber-300"></div>
    </>
  );
};

export default Header;
