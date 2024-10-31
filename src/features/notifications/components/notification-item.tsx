type NotificationItemProps = {
  title: string;
  message: string;
  created_at?: string;
};

export const NotificationItem = ({
  title,
  message,
  created_at,
}: NotificationItemProps) => {
  return (
    <div className="mb-2 flex items-start rounded-lg border-l-4 border-primary bg-white p-4 shadow-lg">
      <div className="grow">
        <h4 className="text-lg font-bold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{message}</p>
        <p className="mt-1 text-xs text-gray-400">
          {new Date(created_at + '').toDateString()}
        </p>
      </div>
    </div>
  );
};
