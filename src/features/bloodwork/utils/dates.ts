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

// regex fir dates
const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

export const convertToDateKey = (value: string): string => {
  const dateOnly = value.match(DATE_ONLY);
  if (dateOnly) {
    return value;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value.slice(0, 10);
  }

  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');
  return `${parsed.getFullYear()}-${month}-${day}`;
};

export const todayKey = (): string =>
  convertToDateKey(new Date().toISOString());

export const formatChartDate = (dateKey: string, withYear = false): string => {
  const match = dateKey.match(DATE_ONLY);
  if (!match) return dateKey;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const monthName = SHORT_MONTHS[month - 1];
  if (!monthName) {
    return dateKey;
  }

  return withYear ? `${day} ${monthName} ${year}` : `${day} ${monthName}`;
};
