/**
 * Medication-Specific Reminder Utilities
 *
 * Checks upcoming scheduled medication days and triggers browser
 * push notifications when a medication is due today or tomorrow.
 */

import type { DailyLog } from '@/features/daily-logs/types';

export type MedicationSchedule = {
  catId: string;
  catName: string;
  medicationName: string;
  dose: string;
  lastDoseDate: Date;
  nextDoseDate: Date;
  daysUntilNextDose: number;
  frequencyDays: number;
};

const DEFAULT_FIP_FREQUENCY_DAYS = 7;

function inferFrequency(logs: DailyLog[]): number {
  if (logs.length < 2) return DEFAULT_FIP_FREQUENCY_DAYS;
  const sortedDates = logs
    .map((log) => new Date(log.log_date).getTime())
    .sort((a, b) => a - b);
  const gaps: number[] = [];
  for (let i = 1; i < sortedDates.length; i++) {
    const daysBetween = Math.round((sortedDates[i] - sortedDates[i - 1]) / (1000 * 60 * 60 * 24));
    if (daysBetween > 0 && daysBetween <= 30) gaps.push(daysBetween);
  }
  if (gaps.length === 0) return DEFAULT_FIP_FREQUENCY_DAYS;
  gaps.sort((a, b) => a - b);
  return gaps[Math.floor(gaps.length / 2)];
}

export function getMedicationSchedule(logs: DailyLog[], catId: string, catName: string): MedicationSchedule[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const medLogs = new Map<string, DailyLog[]>();
  for (const log of logs) {
    if (!log.medication_name || !log.dose) continue;
    const key = log.medication_name.toLowerCase().trim();
    if (!medLogs.has(key)) medLogs.set(key, []);
    medLogs.get(key)!.push(log);
  }
  const schedules: MedicationSchedule[] = [];
  for (const [, logsForMed] of medLogs) {
    const sorted = [...logsForMed].sort((a, b) => new Date(b.log_date).getTime() - new Date(a.log_date).getTime());
    const lastLog = sorted[0];
    const lastDoseDate = new Date(lastLog.log_date);
    lastDoseDate.setHours(0, 0, 0, 0);
    const frequencyDays = inferFrequency(logsForMed);
    const nextDoseDate = new Date(lastDoseDate);
    nextDoseDate.setDate(nextDoseDate.getDate() + frequencyDays);
    const daysUntilNextDose = Math.round((nextDoseDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    schedules.push({ catId, catName, medicationName: lastLog.medication_name!, dose: lastLog.dose!, lastDoseDate, nextDoseDate, daysUntilNextDose, frequencyDays });
  }
  return schedules;
}

function sendMedicationNotification(schedule: MedicationSchedule): void {
  if (Notification.permission !== 'granted') return;
  const urgency = schedule.daysUntilNextDose === 0 ? '🚨 DUE TODAY' : schedule.daysUntilNextDose === 1 ? '⏰ Due tomorrow' : `📅 Due in ${schedule.daysUntilNextDose} days`;
  const title = `${urgency}: ${schedule.catName}'s medication`;
  const body = `${schedule.medicationName} — ${schedule.dose}\nNext dose: ${schedule.nextDoseDate.toLocaleDateString()}`;
  const notification = new Notification(title, {
    body,
    icon: '/cat-icon.png',
    tag: `med-reminder-${schedule.catId}-${schedule.medicationName}`,
    requireInteraction: schedule.daysUntilNextDose === 0,
  });
  notification.onclick = () => { window.focus(); notification.close(); };
}

export function checkMedicationReminders(schedules: MedicationSchedule[]): void {
  if (Notification.permission !== 'granted') return;
  const notificationKey = `medicationRemindersShown_${new Date().toDateString()}`;
  if (localStorage.getItem(notificationKey)) return;
  let sent = false;
  for (const schedule of schedules) {
    if (schedule.daysUntilNextDose >= 0 && schedule.daysUntilNextDose <= 1) {
      sendMedicationNotification(schedule);
      sent = true;
    }
  }
  if (sent) localStorage.setItem(notificationKey, 'true');
}

export async function initMedicationReminders(schedules: MedicationSchedule[]): Promise<boolean> {
  if (!('Notification' in window)) return false;
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return false;
  checkMedicationReminders(schedules);
  setInterval(() => checkMedicationReminders(schedules), 60 * 60 * 1000);
  return true;
}

export function formatMedicationSchedule(schedule: MedicationSchedule): string {
  const { daysUntilNextDose, nextDoseDate } = schedule;
  if (daysUntilNextDose < 0) return `⚠️ Overdue by ${Math.abs(daysUntilNextDose)} day(s)`;
  if (daysUntilNextDose === 0) return `🚨 Due TODAY — ${nextDoseDate.toLocaleDateString()}`;
  if (daysUntilNextDose === 1) return `⏰ Due TOMORROW — ${nextDoseDate.toLocaleDateString()}`;
  return `📅 Next dose in ${daysUntilNextDose} days — ${nextDoseDate.toLocaleDateString()}`;
}
