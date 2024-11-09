import clsx from 'clsx';
import { Link } from 'react-router-dom';

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      to="/"
      className={clsx(
        className,
        'mx-auto flex items-center justify-center gap-2 ',
      )}
    >
      <img
        src="/cat-medication.png"
        className="mx-auto inline-block h-auto max-h-10"
        alt="FIP CatCare"
      />
      <h1 className="hidden text-center text-sm font-extrabold md:text-xl lg:inline-block xl:text-2xl">
        FIP CatCare
      </h1>
    </Link>
  );
};
