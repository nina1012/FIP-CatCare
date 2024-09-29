export type Bloodwork = {
  bloodwork_id: string;
  cat_id: string;
  test_date: Date;
  category: string; // Red Cells, White Cells, Chemistry
  test_name: string; //  Hemoglobin, WBC Count
  abbreviation?: string; //  HGB, WBC
  result?: number; //
  unit?: string; // ( g/dL, cells/mL)
  normal_range?: string; //  (12-16 g/dL)
  created_at: Date;
  updated_at: Date;
  desciption?: string;
};
