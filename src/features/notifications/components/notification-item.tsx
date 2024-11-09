type NotificationItemProps = {
  title: string;
  message: string;
  created_at?: string;
  deleteNotification?: () => Promise<void>;
};

export const NotificationItem = ({
  title,
  message,
  created_at,
  deleteNotification,
}: NotificationItemProps) => {
  return (
    <div
      data-testid="notification-item"
      className="mb-2 flex items-start justify-between rounded-lg border-l-4 border-primary bg-white p-4 shadow-lg"
    >
      <div className="grow">
        <h4 className="text-base font-bold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{message}</p>
        <p className="mt-1 text-xs text-gray-400">
          {new Date(created_at + '').toDateString()}
        </p>
      </div>
      <button
        onClick={deleteNotification}
        className="flex size-2 cursor-pointer items-baseline rounded-full border-none bg-primary"
      ></button>
    </div>
  );
};
