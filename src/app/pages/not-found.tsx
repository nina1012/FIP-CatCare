import { PawPrint } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/common/button';

export const NotFoundRoute = () => (
  <div className="relative max-h-screen">
    <div className="relative flex h-min w-full flex-none flex-col flex-nowrap items-center justify-start gap-0 overflow-visible bg-primary p-3 md:p-6">
      <div className="z-20 flex min-h-screen w-full flex-col items-center justify-center rounded-lg bg-white pt-4 backdrop-opacity-35">
        <div className="h-auto w-80">
          <img src="/white-cat.png" className="h-auto" alt="cat 404" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">Hey, page was not found!</h1>
          <p className="text-gray-400">This page doesn&apos;t exist.</p>
          <div className="mt-2">
            <Button className="hover:cursor-pointer" asChild>
              <Link to="/" className="flex gap-1">
                <PawPrint />
                Go back home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
