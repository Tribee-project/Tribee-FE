import HeaderAuthButtons from '@/components/HeaderAuthButtons/HeaderAuthButtons';
import HeaderCategories from '@/components/HeaderCategories/HeaderCategories';
import SearchBar from '@/components/SearchBar/SearchBar';
import UserInfoButtons from '@/components/UserInfoButtons/UserInfoButtons';

const Header: React.FC = () => {
  return (
    <>
      <div className="flex h-50 w-280 flex-col gap-1">
        <HeaderAuthButtons />
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
