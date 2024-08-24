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
        {cats?.map((cat) => (
          <Link
            to={`/app/cat/${cat.cat_id}`}
            key={cat.cat_id}
            className="my-8 flex w-full flex-col p-4 shadow-md"
          >
            <div className="self-end">
              <Link to={`/app/cat/${cat.cat_id}/edit`}>edit</Link>
            </div>
            <img
              // src={cat.cat_image_url as string}
              className="size-28 overflow-hidden rounded-full"
              alt={cat.name}
            />
            <h5>{cat.name}</h5>
          </Link>
        ))}
        <Link to="../cat/new" className="flex gap-2">
          <Button>
            <PawPrintIcon className="mr-2" /> New Cat Registration
          </Button>
        </Link>
      </div>
    </div>
  );
};
