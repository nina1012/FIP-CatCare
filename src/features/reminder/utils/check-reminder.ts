import { sendDailyReminder } from './send-daily-reminder';

export const checkReminder = () => {
  const reminderTime = localStorage.getItem('reminderTime');
  if (!reminderTime) return;

  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  const [reminderHours, reminderMinutes] = reminderTime.split(':');

  const lastReminder = localStorage.getItem('lastReminder') || reminderTime;

  // Check if the reminder has already been sent today
  if (lastReminder) {
    const lastReminderDate = new Date(lastReminder);
    const isSameDay =
      lastReminderDate.getFullYear() === currentTime.getFullYear() &&
      lastReminderDate.getMonth() === currentTime.getMonth() &&
      lastReminderDate.getDate() === currentTime.getDate();

    // If reminder has already been sent today
    if (isSameDay) {
      return;
    }
  }

  // If the current time matches the reminder time
  if (
    parseInt(reminderHours) === currentHours &&
    parseInt(reminderMinutes) === currentMinutes
  ) {
    sendDailyReminder();
    localStorage.setItem('lastReminder', currentTime.toString());
  }
};

setInterval(checkReminder, 60 * 1000); // Check every 60 seconds
