import { useUser } from '@/features/auth/api/get-auth-user';
import { useUserData } from '@/features/user/api/get-user-data';

export const UserRoute = () => {
  const { user } = useUser();
  const { userData } = useUserData(user?.id as string);

  if (!user || !userData) return;

  return (
    <div className="container">
      <h2 className="mb-4 text-2xl font-semibold">Your profile</h2>
      <div>Here goes the form for updating user&apos;s data</div>
    </div>
  );
};
