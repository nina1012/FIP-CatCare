import { Bell, BellDot } from 'lucide-react';
import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';

export function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Subscribe to the notifications table via real-time channel
    // used channel().on() - because of the typescript and to create real-time channel which allows us to listen to specific db changes
    const channel = supabase
      .channel('notifications-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            payload.new,
          ]);
        },
      )
      .subscribe();

    // cleanup the subscription when the component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="relative z-50 bg-red-400">
      <h2>Your Notifications</h2>
      {notifications.length > 0 ? <BellDot /> : <Bell />}
      {notifications.map((notification) => (
        <div key={notification.id}>{notification.message}</div>
      ))}
    </div>
  );
}
