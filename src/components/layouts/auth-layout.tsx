type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-primary py-12 sm:px-6 lg:px-8">
      <img
        className="absolute left-0 top-0 h-auto max-h-full opacity-20 sm:top-0 md:left-1/2"
        src="/cute-pink-paws.png"
        alt="paws"
      />
      <div className="relative sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="rounded-lg bg-white px-4 py-8 shadow sm:px-10">
          <h2 className="mb-4 text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
};
