import { Logo } from '../common/logo';

import { Nav } from './nav';

export const Header = () => {
  return (
    <header className="fixed top-0 z-40 flex h-16 w-full items-center justify-between bg-white px-8 shadow-md">
      <Logo />
      <Nav />
    </header>
  );
};
