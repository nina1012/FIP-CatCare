export const sendDailyReminder = () => {
  if (Notification.permission === 'granted') {
    new Notification('Daily Treatment Reminder', {
      body: "Don't forget to log your cat's daily treatment! It's best for your cat to be given a medication at the same time daily if possible",
      icon: '/cat-medication.png',
    });
  }
};
