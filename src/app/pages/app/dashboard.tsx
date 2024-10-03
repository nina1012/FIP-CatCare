import { PawPrint } from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/common/avatar';
import { Badge } from '@/components/ui/common/badge';
import { Button } from '@/components/ui/common/button';
import { Loader } from '@/components/ui/common/loader';
import { CustomTabContent } from '@/components/ui/tabs/custom-tab-content';
import { useUser } from '@/features/auth/api/get-auth-user';
import { useCats } from '@/features/cat/api/get-cats';
import { RegisterCatForm } from '@/features/cat/components/register-cat-form';

export const DashboardRoute = () => {
  const { user, isLoadingUser } = useUser();
  const { cats, isLoadingCats } = useCats(user?.id as string);

  if (isLoadingUser || isLoadingCats) {
    return (
      <div className="container">
        <div className="flex h-96 items-center justify-center">
          <Loader />
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
                <Avatar className="size-28">
                  <AvatarImage
                    className="mx-auto size-full rounded-full border-2 object-cover object-center"
                    src={cat_image_url as string}
                  />
                  <AvatarFallback className="mx-auto flex size-full gap-1  text-xs font-semibold">
                    {name} <PawPrint size={12} />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <h5>{name}</h5>
                  <Button>view info</Button>
                </div>
              </Link>
            );
          })}
        </div>
        <CustomTabContent
          label="new registration"
          formComponent={<RegisterCatForm />}
          icon={<PawPrint />}
        ></CustomTabContent>
      </div>
    </div>
  );
};
