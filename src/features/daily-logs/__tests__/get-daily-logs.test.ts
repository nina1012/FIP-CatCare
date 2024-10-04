import { describe, expect, it, Mock, vi } from 'vitest';

import { supabase } from '@/lib/supabase';

import { getDailyLogsFn } from '../api/get-daily-logs';
import { DailyLog } from '../types';

vi.mock('@/lib/supabase');

describe('getDailyLogsFn', () => {
  it('renders list of daily logs for specified cat', async () => {
    const catID = '123';
    const logs: DailyLog[] = [
      {
        log_id: '456',
        cat_id: catID,
        log_date: '2024-09-14T20:27:12.089',
        weight: 2.3,
        medication_name: 'GS-20',
        dose: '0.5',
        created_at: '2024-09-14T20:27:12.12284',
        updated_at: '2024-09-14T20:27:12.12284',
        note: "First day of treatment, everything's well 😊",
        day: 0,
      },
      {
        log_id: '457',
        cat_id: catID,
        log_date: '2024-09-16T11:57:51.495',
        weight: 2.3,
        medication_name: 'GS-20',
        dose: '0.7',
        created_at: '2024-09-16T11:57:51.54606',
        updated_at: '2024-09-16T11:57:51.54606',
        note: 'Second day, temperature has dropped from 39.4 to 38.2',
        day: 1,
      },
    ];

    const mockFrom = vi.fn(() => ({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          data: [logs],
          error: null,
        }),
      }),
    }));

    (supabase.from as Mock).mockImplementation(mockFrom);
    //  test table to show 5 rows and first page
    const dailyLogs = await getDailyLogsFn(catID, 0, 5);

    expect(dailyLogs).toContainEqual(logs);
  });
});
