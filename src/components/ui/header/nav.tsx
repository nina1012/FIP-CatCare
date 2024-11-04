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
import { useNotifications } from '@/features/notifications/api/get-notifications';
import NotificationBell from '@/features/notifications/components/notification-bell';
import { Notifications } from '@/features/notifications/components/notifications';
import { useUserData } from '@/features/user/api/get-user-data';

import { AvatarFallback, AvatarImage } from '../common/avatar';
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
  const { notifications, deleteNotification } = useNotifications();
  return (
    <nav className="flex items-center">
      {/* menu on desktop screen */}
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
          <Link to="/app/user" className="nav-link">
            My Profile
          </Link>
        </li>
        <li>
          <Link to="/app/dosage-calc" className="nav-link">
            Dosage calculator
          </Link>
        </li>
      </ul>
      <div className="hidden gap-2 md:flex">
        <Menubar
          data-testid="menu-notifications"
          className="rounded border-none"
        >
          <MenubarMenu>
            <MenubarTrigger className="hover:cursor-pointer">
              <NotificationBell
                hasNotifications={
                  notifications.filter((not) => not.deleted === false).length >
                  0
                }
              />
            </MenubarTrigger>
            <MenubarContent data-testid="notifications" className="">
              <Notifications
                notifications={notifications}
                deleteNotification={deleteNotification}
              />
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <Button className="flex w-full justify-start" onClick={() => logout()}>
          Logout
        </Button>
      </div>
      {/* menu on mobile screen */}
      <div className="flex items-center gap-2 md:hidden md:opacity-0">
        <Menubar className="rounded border-none">
          <MenubarMenu>
            <MenubarTrigger>
              <NotificationBell
                hasNotifications={
                  notifications.filter((not) => not.deleted === false).length >
                  0
                }
              />
            </MenubarTrigger>
            <MenubarContent>
              <Notifications
                notifications={notifications}
                deleteNotification={deleteNotification}
              />
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <Menubar className="size-12 rounded-full">
          <MenubarMenu>
            <MenubarTrigger className="rounded-full !bg-transparent p-0  hover:cursor-pointer">
              <Avatar>
                <AvatarImage
                  src={userData?.avatar_url as string}
                  className="size-full rounded-full object-cover object-center"
                  alt="Avatar image"
                />
                <AvatarFallback>
                  <img
                    className="size-full rounded-full object-cover object-center"
                    src="/avatar-placeholder.png"
                    alt="avatar"
                  />
                </AvatarFallback>
              </Avatar>
            </MenubarTrigger>
            <MenubarContent className="bg-white">
              <MenubarItem>
                <Link to="/app/dashboard">Dashboard</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="/app/user">My Profile</Link>
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
