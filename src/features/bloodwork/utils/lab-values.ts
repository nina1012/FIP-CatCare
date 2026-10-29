export const convertToLabNumber = (value: unknown): number | null => {
  if (value === null || value === '') {
    return null;
  }
  const parsed =
    typeof value === 'number' ? value : Number(String(value).replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
};

export const formatLabNumber = (value: number | null): string => {
  if (value === null) {
    return '—';
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 3,
  }).format(value);
};

export const LAB_REPORTS_BUCKET = 'lab_reports';

// 10MB in bytes
export const MAX_LAB_REPORT_BYTES = 10 * 1024 * 1024;

export const LAB_REPORT_ACCEPT =
  'image/jpeg,image/png,image/webp,image/gif,application/pdf';

const ALLOWED_LAB_REPORT_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
]);

export const labReportTypeError = (file: File): string | null => {
  if (!ALLOWED_LAB_REPORT_TYPES.has(file.type)) {
    return 'Attach a JPEG, PNG, WEBP, GIF or PDF lab report.';
  }
  if (file.size > MAX_LAB_REPORT_BYTES) {
    return 'Lab reports must be 10 MB or smaller.';
  }
  return null;
};
