import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/common/button';

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between bg-white px-8 shadow-sm backdrop-blur-2xl">
      <Link to="/" className="flex items-center justify-center gap-2 font-bold">
        <img
          src="/cat-medication.png"
          className="h-auto max-h-10"
          alt="FIP CatCare"
        />
        <h1 className="text-xl">FIP CatCare</h1>
      </Link>
      <nav>
        <ul
          className="relative hidden h-full cursor-default select-none items-center justify-center gap-10
      rounded-sm px-2 py-1.5 text-base font-medium outline-none *:text-xs focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 md:flex
      "
        >
          <li>
            <Button variant="link">
              <Link to="/auth/register" className="">
                Register
              </Link>
            </Button>
          </li>

          <li>
            <Button>
              <Link to="/auth/login" className="">
                Login
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
