import { PawPrintIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/common/badge';
import { Button } from '@/components/ui/common/button';
import { Spinner } from '@/components/ui/common/spinner';
import { useUser } from '@/features/auth/api/get-auth-user';
import { useCats } from '@/features/cat/api/get-cats';

export const DashboardRoute = () => {
  const { user, isLoadingUser } = useUser();
  const { cats, isLoadingCats } = useCats(user?.id as string);

  if (isLoadingUser || isLoadingCats) {
    return (
      <div className="container">
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Badge className="pointer-events-none !text-xs">cat owner</Badge>
      </div>
      <div className="mt-8">
        <h4 className="mb-2 font-bold ">Your cats</h4>
        <div className="my-4 flex max-w-lg flex-wrap gap-6 md:max-w-4xl">
          {' '}
          {cats?.map(({ cat_id, cat_image_url, name }) => {
            return (
              <Link
                to={`/app/cat/${cat_id}`}
                key={cat_id}
                className="my-8 flex w-full items-center gap-6 rounded-md bg-[#dfdddd]/10 p-4 font-semibold shadow-md md:w-[45%] lg:w-[30%]"
              >
                <img
                  src={
                    (cat_image_url || '/public/cat-placeholder.jpg') as string
                  }
                  className="size-28 overflow-hidden rounded-full border-2 object-cover object-center"
                  alt={name}
                />
                <div className="flex flex-col gap-2">
                  <h5>{name}</h5>
                  <Button>view info</Button>
                </div>
              </Link>
            );
          })}
        </div>
        <Link to="../cat/new" className="flex gap-2">
          <Button>
            <PawPrintIcon className="mr-2" /> New Cat Registration
          </Button>
        </Link>
      </div>
    </div>
  );
};
