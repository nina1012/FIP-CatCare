import { Button } from '@/components/ui/common/button';
import { Spinner } from '@/components/ui/common/spinner';
import { useToast } from '@/components/ui/toast/use-toast';
import { useUser } from '@/features/auth/api/get-auth-user';
import { useLogout } from '@/features/auth/api/logout';

export const DashboardRoute = () => {
  const { user, isLoadingUser } = useUser();
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
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-7xl">Welcome {user?.email}</h1>
      <Button onClick={() => logout()}>Logout</Button>
      <div>
        List all user&apos;s cats and add the button which when clicked, open a
        modal for registering new cat
      </div>
    </div>
  );
};
