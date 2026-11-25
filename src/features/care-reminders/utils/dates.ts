const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

export const toDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const todayKey = (): string => toDateKey(new Date());

export const dateKeyFromValue = (value: string): string => {
  if (DATE_ONLY.test(value)) return value;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value.slice(0, 10);
  return toDateKey(parsed);
};

export const addDays = ({
  dateKey,
  days,
}: {
  dateKey: string;
  days: number;
}): string => {
  const match = dateKey.match(DATE_ONLY);
  if (!match) return dateKey;

  const date = new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
  );
  date.setDate(date.getDate() + days);
  return toDateKey(date);
};

export const formatReminderDate = (dateKey: string): string => {
  const match = dateKey.match(DATE_ONLY);
  if (!match) return dateKey;

  const monthName = SHORT_MONTHS[Number(match[2]) - 1];
  if (!monthName) {
    console.error('Invalid month name', match[2]);
    return dateKey;
  }

  return `${Number(match[3])} ${monthName} ${match[1]}`;
};
