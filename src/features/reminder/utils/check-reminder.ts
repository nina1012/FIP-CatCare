import { sendDailyReminder } from './send-daily-reminder';

export const checkReminder = async () => {
  const reminderTime = localStorage.getItem('reminderTime');
  if (!reminderTime) return;

  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  const [reminderHours, reminderMinutes] = reminderTime.split(':');

  // If the current time matches the reminder time
  if (
    parseInt(reminderHours) === currentHours &&
    parseInt(reminderMinutes) === currentMinutes
  ) {
    sendDailyReminder();
  }
};

setInterval(checkReminder, 60 * 1000); // Check every 60 seconds
