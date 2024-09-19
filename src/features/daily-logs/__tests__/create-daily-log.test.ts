import { it, vi, expect, describe, Mock } from 'vitest';

import { supabase } from '@/lib/supabase';
import { screen, waitFor } from '@/testing/test-utils';

import { createDailyLogFn } from '../api/create-daily-log';
import { DailyLog } from '../types';

vi.mock('@/lib/supabase'); // mock supabase client

describe('createDailyLogFn', () => {
  // mocked daily log
  const mockDailyLog: Partial<DailyLog> = {
    log_id: '123',
    log_date: '2024-09-15',
    weight: 3,
    medication_name: 'GS-20',
    dose: '0.5',
    note: 'Well',
    day: 0,
  };

  it('creates a daily log if no existing log for today', async () => {
    // implementing mocked supabase fetch to db for selecting and inserting data
    const mockFrom = vi.fn(() => ({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          gte: vi.fn().mockReturnValue({
            lte: vi.fn().mockResolvedValueOnce({ data: [], error: null }),
          }),
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockReturnValue({
              single: vi.fn().mockReturnValue({
                data: [],
                error: null,
              }),
            }),
          }),
        }),
      }),
      insert: vi
        .fn()
        .mockResolvedValueOnce({ data: [mockDailyLog], error: null }),
    }));

    (supabase.from as Mock).mockImplementation(mockFrom);

    const result = await createDailyLogFn({
      newDailyLog: mockDailyLog,
      catID: '123',
    });

    expect(result).toEqual(mockDailyLog);
    expect(supabase.from).toHaveBeenCalledWith('daily_logs');

    // when successfully creating a daily log, show the toast

    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(() => {
      expect(
        screen.getByRole('status', {
          name: /you have successfully added a new daily log 😊/i,
        }),
      ).toBeInTheDocument();
    });
  });
});
