import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Subscribe to the notifications table via real-time channel
    // used channel().on() - because of the typescript and to create real-time channel which allows us to listen to specific db changes
    // When we subscribe to the channel this way, the WebSocket connection is being opened and it listens to events to happen (insert, update, etc.)
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
    setIsLoading(false);

    // cleanup the subscription when the component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  return { notifications, isLoading };
};
