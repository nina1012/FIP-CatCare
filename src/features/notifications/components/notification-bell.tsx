import { Bell } from 'lucide-react';

interface NotificationBellProps {
  hasNotifications: boolean;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  hasNotifications,
}) => {
  // hasNotification should only care about notifications that are not set deleted = true!!!
  return (
    <div className="relative">
      <Bell className="text-inherit" />
      {hasNotifications && (
        <div className="absolute right-0 top-0 size-2 animate-ping rounded-full bg-primary" />
      )}
    </div>
  );
};

export default NotificationBell;
