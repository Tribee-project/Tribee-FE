import { GithubOutlined } from '@ant-design/icons';

const Footer: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-1 border-t-3 border-amber-300">
      <div className="mx-auto flex h-40 w-350 items-center justify-between text-gray-800">
        <div className="flex items-center justify-center gap-3">
          <GithubOutlined className="text-4xl" />
          <div className="flex flex-col">
            <a
              href="https://github.com/Tribee-project"
              target="_blank"
              className="whitespace-nowrap hover:text-shadow-lg"
            >
              Organization
            </a>
            <a
              href="https://github.com/Tribee-project/Tribee-FE"
              target="_blank"
              className="whitespace-nowrap hover:text-shadow-lg"
            >
              Front-end Github
            </a>
            <a
              href="https://github.com/Tribee-project/Tribee-BE"
              target="_blank"
              className="whitespace-nowrap hover:text-shadow-lg"
            >
              Back-end Github
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
