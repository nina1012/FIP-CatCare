import { Link } from 'react-router-dom';

import { Nav } from './nav';

export const Header = () => {
  return (
    <header className="fixed top-0 z-40 flex h-16 w-full items-center justify-between bg-white px-8 shadow-md">
      <Link
        to="/app/dashboard"
        className="flex items-center justify-center gap-2 font-bold"
      >
        <img
          src="/cat-medication.png"
          className="h-auto max-h-10"
          alt="FIP CatCare"
        />
        <h1 className="text-xl">FIP CatCare</h1>
      </Link>
      <Nav />
    </header>
  );
};
