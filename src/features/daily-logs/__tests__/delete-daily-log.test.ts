import { expect, Mock, test, vi } from 'vitest';

import { supabase } from '@/lib/supabase';

import { deleteDailyLogFn } from '../api/delete-daily-log';
import { DailyLog } from '../types';

vi.mock('@/lib/supabase');

test('deleteDailyLogFn', async () => {
  // have a mocked daily log so we can pretend to have deleted it
  const mockedDailyLog: Partial<DailyLog> = {
    log_id: '123',
    log_date: '2024-09-15',
    weight: 3,
    medication_name: 'GS-20',
    dose: '0.5',
    note: 'Well',
    day: 0,
    cat_id: '123',
  };

  const mockFrom = vi.fn(() => ({
    delete: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        data: [],
        error: null,
      }),
    }),
  }));

  (supabase.from as Mock).mockImplementation(mockFrom);
  const deletedDailyLog = await deleteDailyLogFn({
    logID: mockedDailyLog.log_id as string,
  });

  expect(deletedDailyLog).toEqual([]);
  expect(supabase.from).toHaveBeenCalledWith('daily_logs');
});
