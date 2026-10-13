import { expect, Mock, test, vi } from 'vitest';

import { supabase } from '@/lib/supabase';

import { updateDailyLogFn } from '../api/update-daily-log';

vi.mock('@/lib/supabase');

test('updateDailyLogFn writes dose, weight, brand, and note only', async () => {
  const eq = vi.fn().mockResolvedValue({ data: null, error: null });
  const update = vi.fn().mockReturnValue({ eq });

  (supabase.from as Mock).mockReturnValue({ update });

  await updateDailyLogFn({
    logID: '123',
    updatedDailyLog: {
      log_id: '123',
      cat_id: 'cat-1',
      day: 4,
      log_date: '2024-09-15',
      dose: '1.5',
      weight: 3.2,
      medication_name: 'GS-20',
      note: 'Eating well',
    },
  });

  expect(supabase.from).toHaveBeenCalledWith('daily_logs');
  expect(update).toHaveBeenCalledWith({
    dose: '1.5',
    weight: 3.2,
    medication_name: 'GS-20',
    note: 'Eating well',
  });
  expect(eq).toHaveBeenCalledWith('log_id', '123');
});
