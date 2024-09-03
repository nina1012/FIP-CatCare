export type DailyLog = {
  log_id: string;
  cat_id: string | null;
  log_date: string;
  weight: number | null;
  medication_name: string | null;
  dose: string | null;
  note: string | null;
  day: number;
  created_at: string | null;
  updated_at: string | null;
};
