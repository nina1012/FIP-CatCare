import { toast } from '@/components/ui/toast/use-toast';

// Helper function to format the time
const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Function to display toast with dynamic reminder time
export const notifyReminderSet = (reminderTime: string) => {
  const now = new Date();
  const [reminderHours, reminderMinutes] = reminderTime.split(':').map(Number);

  // Create a date object for today's reminder time
  const todayReminderDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    reminderHours,
    reminderMinutes,
  );

  // if today’s time has already passed, create date for tomorrow
  const tomorrowReminderDate = new Date(
    todayReminderDate.getTime() + 24 * 60 * 60 * 1000,
  );

  // Check if the reminder is for today or tomorrow
  const isTomorrow = now > todayReminderDate;

  const reminderDate = isTomorrow ? tomorrowReminderDate : todayReminderDate;
  const reminderDateStr = isTomorrow ? 'tomorrow' : 'today';

  const formattedTime = formatTime(reminderDate);

  toast({
    title: '🔔',
    description: `Reminder has been set for ${formattedTime} ${reminderDateStr}.`,
  });
};
