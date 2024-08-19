import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/common/avatar';
import { Button } from '@/components/ui/common/button';
import { Spinner } from '@/components/ui/common/spinner';
import { useToast } from '@/components/ui/toast/use-toast';
import { useUser } from '@/features/auth/api/get-auth-user';
import { useLogout } from '@/features/auth/api/logout';
import { useCats } from '@/features/cat/api/get-cats';
import { useUserData } from '@/features/user/api/get-user-data';

export const DashboardRoute = () => {
  const { user, isLoadingUser } = useUser();
  const { userData } = useUserData(user?.id as string);
  const { cats } = useCats(user?.id as string);
  const { toast } = useToast();
  const { logout } = useLogout({
    onSuccess: () => {
      toast({
        title: 'Logging out',
        description: 'Bye 🐾',
      });
    },
    onError: (error) => {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    },
  });

  if (isLoadingUser) {
    return (
      <div className="container">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hello {userData?.full_name}</h1>
        <Avatar className="size-12">
          <AvatarImage src={userData?.avatar_url as string} />
          <AvatarFallback>{userData?.full_name}</AvatarFallback>
        </Avatar>
      </div>
      <Button onClick={() => logout()}>Logout</Button>
      <div className="mt-8">
        <h4 className="mb-2 font-bold ">Your cats</h4>
        {cats?.map((cat) => (
          <div key={cat.cat_id} className="flex w-full p-4 shadow-md">
            <img
              src={cat.image_url as string}
              className="size-28 overflow-hidden rounded-full"
              alt={cat.name}
            />
            <h5>{cat.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};
