import SearchResultList from '@/components/SearchResultList/SearchResultList';
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';

const SearchResultPage: React.FC = () => {
  return (
    <div className="flex w-screen flex-col gap-1">
      <div className="flex flex-col items-center gap-1">
        <Header />
      </div>
      <div className="flex justify-center">
        <SearchResultList />
      </div>
      <Footer />
    </div>
  );
};

export default SearchResultPage;
