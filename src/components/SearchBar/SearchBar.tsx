import { SearchOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    [],
  );

  const handleSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && searchValue.length > 0) {
        navigate(`/search?q=${searchValue}`);
      }
    },
    [searchValue, navigate],
  );

  return (
    <div className="flex w-full items-center">
      <img
        src={'/src/assets/Tribee.webp'}
        alt="logo"
        className="h-25 w-25 cursor-pointer"
        onClick={() => {
          navigate('/');
        }}
      />
      <div className="flex w-120 justify-center gap-2 rounded-full border-3 border-amber-300 bg-white p-4 hover:border-amber-400">
        <input
          type="text"
          placeholder="✈️ 어디로 떠나볼까요?"
          className="w-[87%] border-none outline-none"
          maxLength={30}
          onChange={handleSearchValue}
          onKeyDown={handleSearch}
        />
        <SearchOutlined style={{ color: '#FCD34D' }} className="text-2xl" />
      </div>
    </div>
  );
};

export default SearchBar;
