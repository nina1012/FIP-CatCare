import { Avatar } from '@radix-ui/react-avatar';
import { Link } from 'react-router-dom';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/common/menubar';
import { useUser } from '@/features/auth/api/get-auth-user';
import { useLogout } from '@/features/auth/api/logout';
import { useUserData } from '@/features/user/api/get-user-data';

import { AvatarImage } from '../common/avatar';
import { Button } from '../common/button';
import { useToast } from '../toast/use-toast';
export const Nav = () => {
  const { user } = useUser();
  const { userData } = useUserData(user?.id as string);
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
  return (
    <nav>
      <ul
        className="relative hidden h-full cursor-default select-none items-center justify-center gap-10
      rounded-sm px-2 py-1.5 text-base font-medium outline-none *:text-xs focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 md:flex
      "
      >
        <li>
          <Link to="/app/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/app/profile" className="nav-link">
            My Profile
          </Link>
        </li>
        <li>
          <Link to="/app/dosage-calc" className="nav-link">
            Dosage calculator
          </Link>
        </li>
      </ul>
      <div className="block md:hidden md:opacity-0">
        <Menubar className="size-12 rounded-full">
          <MenubarMenu>
            <MenubarTrigger className="rounded-full !bg-transparent p-0  hover:cursor-pointer">
              <Avatar>
                <AvatarImage
                  src={userData?.avatar_url as string}
                  className="size-full rounded-full object-cover object-center"
                  alt="Avatar image"
                />
              </Avatar>
            </MenubarTrigger>
            <MenubarContent className="bg-white">
              <MenubarItem>
                <Link to="/app/dashboard">Dashboard</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="/app/profile">My Profile</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="/app/dosage-calc">Dosage calculator</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Button
                  className="flex w-full justify-start"
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </nav>
  );
};
