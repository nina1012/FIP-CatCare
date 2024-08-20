import { PawPrintIcon } from 'lucide-react';

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
        {cats?.map((cat) => (
          <div key={cat.cat_id} className="my-8 flex w-full p-4 shadow-md">
            <img
              src={cat.image_url as string}
              className="size-28 overflow-hidden rounded-full"
              alt={cat.name}
            />
            <h5>{cat.name}</h5>
          </div>
        ))}
        <Button className="flex gap-2">
          <PawPrintIcon /> New Cat Registration
        </Button>
      </div>
    </div>
  );
};
