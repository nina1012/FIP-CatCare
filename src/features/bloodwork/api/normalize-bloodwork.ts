import { Bloodwork } from '../types';
import { convertToDateKey } from '../utils/dates';
import { convertToLabNumber } from '../utils/lab-values';

export type BloodworkRow = {
  bloodwork_id: string;
  cat_id: string;
  collected_on: string;
  albumin_globulin_ratio: number | string | null;
  hematocrit: number | string | null;
  bilirubin: number | string | null;
  report_url: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export const normalizeBloodwork = (row: BloodworkRow): Bloodwork => ({
  bloodwork_id: row.bloodwork_id,
  cat_id: row.cat_id,
  collected_on: convertToDateKey(row.collected_on),
  albumin_globulin_ratio: convertToLabNumber(row.albumin_globulin_ratio),
  hematocrit: convertToLabNumber(row.hematocrit),
  bilirubin: convertToLabNumber(row.bilirubin),
  report_url: row.report_url,
  created_at: row.created_at,
  updated_at: row.updated_at,
});
