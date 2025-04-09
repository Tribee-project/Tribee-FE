import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center w-full">
      <img
        src={'/src/assets/tribee.png'}
        alt="logo"
        className="w-25 cursor-pointer"
        onClick={() => {
          navigate('/');
        }}
      />
      <div className="flex justify-center gap-2 border-3 border-amber-300 rounded-full p-4 w-120 hover:border-amber-400">
        <input
          type="text"
          placeholder="✈️ 어디로 떠나볼까요?"
          className="border-none outline-none w-[87%]"
          maxLength={30}
        />
        <SearchOutlined style={{ color: '#FCD34D' }} className="text-2xl" />
      </div>
    </div>
  );
};

export default SearchBar;
