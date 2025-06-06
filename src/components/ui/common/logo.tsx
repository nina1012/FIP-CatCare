import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { useUser } from '@/features/auth/api/get-auth-user';

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => {
  const { user } = useUser();
  return (
    <Link
      to={user ? '/app/dashboard' : '/'}
      className={clsx(
        className,
        'flex items-center justify-center gap-2 md:mx-0 ',
      )}
    >
      <img
        src="/cat-medication.png"
        className="mx-auto inline-block h-auto max-h-10"
        alt="FIP CatCare"
      />
      <h1
        aria-hidden="true"
        className="hidden text-center text-sm font-extrabold md:text-xl lg:inline-block xl:text-2xl"
      >
        FIP CatCare
      </h1>
    </Link>
  );
};
