import { Notification } from '../types';

import { NotificationItem } from './notification-item';

export const Notifications = ({
  notifications = [],
}: {
  notifications: Notification[];
}) => {
  return (
    <div className=" rounded-lg bg-gray-50 p-2">
      <div className="flex items-center gap-2 text-sm">
        <h3 className="font-semibold text-gray-800">Notifications</h3>
      </div>
      <hr className="my-2" />
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            title={notification.title}
            message={notification.message}
          />
        ))
      ) : (
        <div className="text-sm">No notifications</div>
      )}
    </div>
  );
};
