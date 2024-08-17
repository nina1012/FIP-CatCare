import { Spinner } from '@/components/ui/common/spinner';
import { useUser } from '@/features/auth/api/get-auth-user';

export const DashboardRoute = () => {
  const { user, isLoadingUser } = useUser();

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
      <div>
        List all user&apos;s cats and add the button which when clicked, open a
        modal for registering new cat
      </div>
    </div>
  );
};
