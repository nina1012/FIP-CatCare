import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // fetch all notifications that are not set deleted  = true
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('deleted', false)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching notifications:', error);
      } else {
        setNotifications(data || []);
      }
      setIsLoading(false);
    };

    fetchNotifications();

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
            payload.new,
            ...prevNotifications,
          ]);
        },
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'notifications' },
        (payload) => {
          const updatedNotification = payload.new;
          setNotifications(
            (prevNotifications) =>
              prevNotifications
                .map((notif) =>
                  notif.id === updatedNotification.id
                    ? updatedNotification
                    : notif,
                )
                .filter((notif) => notif.deleted === false), // exclude deleted notifications
          );
        },
      )
      .subscribe();

    // Cleanup the subscription when the component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const deleteNotification = async (id: string) => {
    const { data, error } = await supabase
      .from('notifications')
      .update({ deleted: true })
      .eq('id', id);

    console.log('Deleting notification with ID:', id, data);

    if (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return { notifications, isLoading, deleteNotification };
};
