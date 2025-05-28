import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full items-center">
      <img
        src={'/src/assets/tribee.png'}
        alt="logo"
        className="w-25 cursor-pointer"
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
        />
        <SearchOutlined style={{ color: '#FCD34D' }} className="text-2xl" />
      </div>
    </div>
  );
};

export default SearchBar;
