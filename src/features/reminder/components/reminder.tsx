import { Bell, BellOff } from 'lucide-react';
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

  const unsetReminder = () => {
    localStorage.removeItem('reminderTime');
    setReminderTime('');
  };

  const saveReminderTime = () => {
    // Save the reminder time to local storage and add the toast
    if (reminderTime) {
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
    }
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
          data-testid="reminder-time"
          value={reminderTime}
          onChange={handleTimeChange}
          className="hover:cursor-pointer"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={saveReminderTime}>
          turn on reminder
          <Bell className="ml-2" />
        </Button>
        <Button variant="destructive" onClick={unsetReminder}>
          turn off reminder
          <BellOff className="ml-2" />
        </Button>
      </div>
    </div>
  );
};
