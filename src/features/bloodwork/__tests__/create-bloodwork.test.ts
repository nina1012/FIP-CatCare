import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/utils/upload-image';

import { createBloodworkFn } from '../api/bloodwork-mutations';

vi.mock('@/lib/supabase');
vi.mock('@/utils/upload-image', () => ({
  uploadImage: vi.fn().mockResolvedValue({ path: 'lab_report.jpeg' }),
  deleteImage: vi.fn(),
}));

const savedRow = {
  bloodwork_id: 'bloodwork-1',
  cat_id: 'cat-1',
  collected_on: '2024-09-15',
  albumin_globulin_ratio: '0.450',
  hematocrit: '28.00',
  bilirubin: '0.800',
  report_url:
    'https://example.supabase.co/storage/v1/object/public/lab_reports/lab_report_1700000000000.jpeg',
  created_at: '2024-09-15T12:00:00.000Z',
  updated_at: '2024-09-15T12:00:00.000Z',
};

describe('createBloodworkFn', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Date, 'now').mockReturnValue(1700000000000);
    vi.stubEnv('VITE_SUPABASE_URL', 'https://example.supabase.co');
  });

  it('saves lab values and the uploaded report url', async () => {
    const single = vi.fn().mockResolvedValue({ data: savedRow, error: null });
    const select = vi.fn().mockReturnValue({ single });
    const insert = vi.fn().mockReturnValue({ select });
    (supabase.from as Mock).mockReturnValue({ insert });

    const report = new File(['report'], 'lab.jpg', { type: 'image/jpeg' });
    const result = await createBloodworkFn({
      cat_id: 'cat-1',
      collected_on: '2024-09-15',
      albumin_globulin_ratio: 0.45,
      hematocrit: 28,
      bilirubin: 0.8,
      report,
    });

    expect(uploadImage).toHaveBeenCalledWith({
      image: report,
      imageName: 'lab_report_1700000000000.jpeg',
      bucketName: 'lab_reports',
    });
    expect(supabase.from).toHaveBeenCalledWith('bloodwork');
    expect(insert).toHaveBeenCalledWith({
      cat_id: 'cat-1',
      collected_on: '2024-09-15',
      albumin_globulin_ratio: 0.45,
      hematocrit: 28,
      bilirubin: 0.8,
      report_url: savedRow.report_url,
    });
    expect(result.albumin_globulin_ratio).toBe(0.45);
    expect(result.report_url).toBe(savedRow.report_url);
  });

  it('saves lab values when no report is attached', async () => {
    const single = vi.fn().mockResolvedValue({
      data: { ...savedRow, report_url: null },
      error: null,
    });
    const select = vi.fn().mockReturnValue({ single });
    const insert = vi.fn().mockReturnValue({ select });
    (supabase.from as Mock).mockReturnValue({ insert });

    await createBloodworkFn({
      cat_id: 'cat-1',
      collected_on: '2024-09-15',
      albumin_globulin_ratio: 0.45,
      hematocrit: 28,
      bilirubin: 0.8,
    });

    expect(uploadImage).not.toHaveBeenCalled();
    expect(insert).toHaveBeenCalledWith(
      expect.objectContaining({ report_url: null }),
    );
  });

  it('rejects a second result on the same date', async () => {
    const single = vi.fn().mockResolvedValue({
      data: null,
      error: { code: '23505', message: 'duplicate key value' },
    });
    const select = vi.fn().mockReturnValue({ single });
    const insert = vi.fn().mockReturnValue({ select });
    (supabase.from as Mock).mockReturnValue({ insert });

    await expect(
      createBloodworkFn({
        cat_id: 'cat-1',
        collected_on: '2024-09-15',
        albumin_globulin_ratio: 0.45,
        hematocrit: 28,
        bilirubin: 0.8,
      }),
    ).rejects.toThrow(
      'A bloodwork result already exists for that date. Open that row to update it.',
    );
  });
});
