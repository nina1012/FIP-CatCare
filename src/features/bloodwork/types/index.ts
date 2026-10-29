export type Bloodwork = {
  bloodwork_id: string;
  cat_id: string;
  collected_on: string;
  albumin_globulin_ratio: number | null;
  hematocrit: number | null;
  bilirubin: number | null;
  report_url: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type BloodworkInput = {
  cat_id: string;
  collected_on: string;
  albumin_globulin_ratio: number;
  hematocrit: number;
  bilirubin: number;
  report?: File | null;
  previous_report_url?: string | null;
};
