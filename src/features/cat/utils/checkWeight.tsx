import { DailyLog } from '@/features/daily-logs/types';

// calculates the change of weight in past 7 days in %
export const calculateWeightChange = (
  prevWeight?: number,
  currWeight?: number,
): number => {
  if (!prevWeight || !currWeight) return 0;
  return ((currWeight - prevWeight) / prevWeight) * 100;
};

export const checkForWeightLoss = (
  dailyLogs: DailyLog[] | null | undefined,
): boolean => {
  if (!dailyLogs || dailyLogs.length < 7) return false;

  const logs = [...dailyLogs].sort((a, b) => a.day - b.day);
  const currentWeight = logs[logs.length - 1]?.weight;
  const previousWeight = logs[logs.length - 7]?.weight;

  if (!currentWeight || !previousWeight) return false;

  const weightChange = calculateWeightChange(previousWeight, currentWeight);

  return weightChange < -10;
};
