import { SetStateAction, useState } from 'react';

import { Button } from '@/components/ui/common/button';
import { Label } from '@/components/ui/form';

import { checkReminder } from '../utils/check-reminder';
import { notifyReminderSet } from '../utils/notify-set-reminder';

export const Reminder = () => {
  const [reminderTime, setReminderTime] = useState<string>(
    localStorage.getItem('reminderTime') || '',
  );

  const handleTimeChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setReminderTime(event.target.value);
  };

  const saveReminderTime = () => {
    // Save the reminder time to local storage and add the toast
    localStorage.setItem('reminderTime', reminderTime);
    notifyReminderSet(reminderTime);
    // if permission is granted, check for the reminder to be shown
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        checkReminder();
      } else {
        console.error('Notification permission denied');
      }
    });
  };
  return (
    <div className="my-4 flex flex-col items-center gap-4">
      <div>
        <Label htmlFor="reminder-time" className="mr-4 font-semibold">
          Set Daily Reminder Time :
        </Label>
        <input
          type="time"
          id="reminder-time"
          value={reminderTime}
          onChange={handleTimeChange}
          className="hover:cursor-pointer"
        />
      </div>
      <Button onClick={saveReminderTime}>Set the reminder</Button>
    </div>
  );
};
