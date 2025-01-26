import { useUser } from '@/features/auth/api/get-auth-user';
import { Reminder } from '@/features/reminder/components/reminder';
import { useUserData } from '@/features/user/api/get-user-data';
import UpdateUserForm from '@/features/user/components/update-user-form';

export const UserRoute = () => {
  const { user } = useUser();
  const { userData } = useUserData(user?.id as string);

  if (!user || !userData) return;

  return (
    <div className="container">
      <h2 className="mb-4 text-2xl font-semibold">Your profile</h2>
      <div className="container max-w-xl">
        <UpdateUserForm userData={userData} />
      </div>
      <hr className="my-12" />
      <h2 className="mb-4 text-2xl font-semibold">Set reminder</h2>
      <Reminder />
    </div>
  );
};
