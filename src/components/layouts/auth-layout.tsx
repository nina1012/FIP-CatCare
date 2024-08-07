import { Link } from 'react-router-dom';

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-primary py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xs">
        <div className="bg-white px-4 py-8 shadow sm:rounded-md sm:px-10">
          <h2 className="my-2 text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          <Link className="flex items-center text-primary" to="/">
            <img src="./cat.png" alt="logo" />
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
};
