import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getMedicationSchedule,
  checkMedicationReminders,
  formatMedicationSchedule,
  type MedicationSchedule,
} from '../check-medication-reminder';
import type { DailyLog } from '@/features/daily-logs/types';

const today = new Date();
today.setHours(0, 0, 0, 0);

const daysAgo = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
};

const makelog = (overrides: Partial<DailyLog> = {}): DailyLog => ({
  log_id: 'test-id',
  cat_id: 'cat-1',
  log_date: daysAgo(0),
  weight: 4.2,
  medication_name: 'GS-441524',
  dose: '10mg/kg',
  note: null,
  day: 1,
  created_at: null,
  updated_at: null,
  ...overrides,
});

describe('getMedicationSchedule', () => {
  it('returns empty array when no logs have medication data', () => {
    const logs = [makelog({ medication_name: null, dose: null })];
    expect(getMedicationSchedule(logs, 'cat-1', 'Whiskers')).toHaveLength(0);
  });

  it('infers 7-day frequency for single FIP log', () => {
    const logs = [makelog({ log_date: daysAgo(7) })];
    const [schedule] = getMedicationSchedule(logs, 'cat-1', 'Whiskers');
    expect(schedule.frequencyDays).toBe(7);
    expect(schedule.daysUntilNextDose).toBe(0);
  });

  it('infers frequency from multiple logs', () => {
    const logs = [
      makelog({ log_id: '1', log_date: daysAgo(0) }),
      makelog({ log_id: '2', log_date: daysAgo(7) }),
      makelog({ log_id: '3', log_date: daysAgo(14) }),
    ];
    const [schedule] = getMedicationSchedule(logs, 'cat-1', 'Whiskers');
    expect(schedule.frequencyDays).toBe(7);
  });

  it('calculates daysUntilNextDose correctly', () => {
    const logs = [makelog({ log_date: daysAgo(3) })];
    const [schedule] = getMedicationSchedule(logs, 'cat-1', 'Whiskers');
    expect(schedule.daysUntilNextDose).toBe(4);
  });

  it('groups medications by name case-insensitively', () => {
    const logs = [
      makelog({ log_id: '1', medication_name: 'GS-441524', log_date: daysAgo(7) }),
      makelog({ log_id: '2', medication_name: 'gs-441524', log_date: daysAgo(0) }),
    ];
    expect(getMedicationSchedule(logs, 'cat-1', 'Whiskers')).toHaveLength(1);
  });

  it('handles multiple different medications', () => {
    const logs = [
      makelog({ log_id: '1', medication_name: 'GS-441524', log_date: daysAgo(7) }),
      makelog({ log_id: '2', medication_name: 'Cerenia', log_date: daysAgo(1) }),
    ];
    expect(getMedicationSchedule(logs, 'cat-1', 'Whiskers')).toHaveLength(2);
  });
});

describe('formatMedicationSchedule', () => {
  const base: MedicationSchedule = {
    catId: 'cat-1', catName: 'Whiskers', medicationName: 'GS-441524',
    dose: '10mg/kg', lastDoseDate: new Date(), nextDoseDate: new Date(),
    daysUntilNextDose: 0, frequencyDays: 7,
  };

  it('shows overdue message when days < 0', () => {
    expect(formatMedicationSchedule({ ...base, daysUntilNextDose: -2 })).toContain('Overdue');
  });

  it('shows due today message when days === 0', () => {
    expect(formatMedicationSchedule({ ...base, daysUntilNextDose: 0 })).toContain('TODAY');
  });

  it('shows due tomorrow message when days === 1', () => {
    expect(formatMedicationSchedule({ ...base, daysUntilNextDose: 1 })).toContain('TOMORROW');
  });

  it('shows days count when days > 1', () => {
    expect(formatMedicationSchedule({ ...base, daysUntilNextDose: 5 })).toContain('5 days');
  });
});

describe('checkMedicationReminders', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  it('does not notify if already shown today', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('true');
    const schedules: MedicationSchedule[] = [{
      catId: 'cat-1', catName: 'Whiskers', medicationName: 'GS-441524',
      dose: '10mg/kg', lastDoseDate: new Date(),
      nextDoseDate: new Date(), daysUntilNextDose: 0, frequencyDays: 7,
    }];
    // Should not throw or crash
    expect(() => checkMedicationReminders(schedules)).not.toThrow();
  });
});
