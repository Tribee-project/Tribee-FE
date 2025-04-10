import { GithubOutlined } from '@ant-design/icons';

const Footer: React.FC = () => {
  return (
    <div className="flex flex-col gap-1 items-center border-t-3 border-amber-300">
      <div className="flex justify-between items-center h-40 text-gray-800 w-350 mx-auto">
        <div className="flex items-center justify-center gap-3">
          <GithubOutlined className="text-4xl" />
          <div className="flex flex-col">
            <a
              href="https://github.com/stoneKong0810"
              target="_blank"
              className="hover:text-shadow-lg whitespace-nowrap"
            >
              Organization : https://github.com/stoneKong0810
            </a>
            <a
              href="https://github.com/stoneKong0810"
              target="_blank"
              className="hover:text-shadow-lg whitespace-nowrap"
            >
              Front-end Developer Github : https://github.com/stoneKong0810
            </a>
            <a
              href="https://github.com/stoneKong0810"
              target="_blank"
              className="hover:text-shadow-lg whitespace-nowrap"
            >
              Back-end Developer Github : https://github.com/stoneKong0810
            </a>
          </div>
        </div>
        <span className="whitespace-nowrap">
          © Tribee. All Rights Reserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
