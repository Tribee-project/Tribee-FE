import { MailOutlined, SmileOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

const UserInfo: React.FC = () => {
  return (
    <div className="mt-10 mb-10 flex flex-col items-center">
      <div className="w-100 rounded-lg border-1 border-gray-300 bg-white px-5 shadow-md">
        <Divider variant="dotted" style={{ borderColor: '#B59171' }}>
          내 프로필
        </Divider>
        <div className="mb-6 flex flex-col">
          <div className="flex items-center gap-2">
            <MailOutlined />
            <span>stonekong2115@gmail.com</span>
          </div>
          <Divider />
          <div className="flex items-center gap-2">
            <SmileOutlined />
            <span>장돌뱅이</span>
            <button className="ml-auto cursor-pointer rounded-md border-1 border-gray-300 p-1 px-2 text-sm text-gray-800 hover:bg-gray-100">
              수정
            </button>
          </div>
          <Divider />
          <div className="flex items-center gap-2">
            <button className="mx-auto cursor-pointer rounded-md border-1 border-gray-300 p-1 px-2 text-sm text-gray-800 hover:bg-gray-100">
              비밀번호 수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
