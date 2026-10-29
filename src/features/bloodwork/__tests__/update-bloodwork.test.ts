import { beforeEach, expect, Mock, test, vi } from 'vitest';

import { supabase } from '@/lib/supabase';

import { updateBloodworkFn } from '../api/bloodwork-mutations';

vi.mock('@/lib/supabase');
vi.mock('@/utils/upload-image', () => ({
  uploadImage: vi.fn(),
  deleteImage: vi.fn(),
}));

const savedRow = {
  bloodwork_id: 'bloodwork-1',
  cat_id: 'cat-1',
  collected_on: '2024-09-15',
  albumin_globulin_ratio: 0.5,
  hematocrit: 30,
  bilirubin: 0.4,
  report_url: null,
  created_at: '2024-09-15T12:00:00.000Z',
  updated_at: '2024-09-15T12:00:00.000Z',
};

beforeEach(() => {
  vi.clearAllMocks();
});

test('updateBloodworkFn writes lab values and leaves the report when none is attached', async () => {
  const single = vi.fn().mockResolvedValue({ data: savedRow, error: null });
  const select = vi.fn().mockReturnValue({ single });
  const eq = vi.fn().mockReturnValue({ select });
  const update = vi.fn().mockReturnValue({ eq });
  (supabase.from as Mock).mockReturnValue({ update });

  await updateBloodworkFn('bloodwork-1', {
    cat_id: 'cat-1',
    collected_on: '2024-09-15',
    albumin_globulin_ratio: 0.5,
    hematocrit: 30,
    bilirubin: 0.4,
  });

  expect(supabase.from).toHaveBeenCalledWith('bloodwork');
  expect(update).toHaveBeenCalledWith(
    expect.objectContaining({
      collected_on: '2024-09-15',
      albumin_globulin_ratio: 0.5,
      hematocrit: 30,
      bilirubin: 0.4,
    }),
  );
  expect(update.mock.calls[0][0]).not.toHaveProperty('report_url');
  expect(eq).toHaveBeenCalledWith('bloodwork_id', 'bloodwork-1');
});
