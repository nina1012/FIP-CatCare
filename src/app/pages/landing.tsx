import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/common/button';

export const LandingRoute = () => {
  return (
    <div className="relative min-h-screen">
      <img
        className="absolute left-0 top-0 z-10 h-auto max-h-full opacity-10 sm:top-0 md:bottom-1/2 md:right-0"
        src="/cute-pink-paws.png"
        alt="paws"
      />
      <div className="relative flex h-min w-full flex-none flex-col flex-nowrap items-center justify-start gap-0 overflow-visible bg-primary p-6">
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-white px-8 shadow-sm">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 font-bold"
          >
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
        {/* container for all the sections */}
        <section className="z-20 flex min-h-screen w-full flex-col bg-white backdrop-opacity-35">
          {/* subsection */}
          <div className="">
            <div className="flex gap-20 p-20">
              <div>
                <h1 className="text-7xl">
                  <p>FIP CatCare App</p>
                </h1>
                <p>
                  Track your cat&apos;s FIP treatment progress effortlessly and
                  stay informed every step of the way
                </p>
              </div>
              <div>
                <img src="/cute-cat.png" alt="illustration" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
