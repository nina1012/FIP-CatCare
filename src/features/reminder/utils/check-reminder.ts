import { sendDailyReminder } from './send-daily-reminder';

export const checkReminder = () => {
  const reminderTime = localStorage.getItem('reminderTime');
  if (!reminderTime) return;

  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  // Extract hours and minutes from the reminder time string (HH:MM)
  const [reminderHours, reminderMinutes] = reminderTime.split(':');

  if (
    parseInt(reminderHours) === currentHours &&
    parseInt(reminderMinutes) === currentMinutes
  ) {
    sendDailyReminder();
  }
};

// Set interval to check every minute
setInterval(checkReminder, 60 * 1000); // Check every 60 seconds
