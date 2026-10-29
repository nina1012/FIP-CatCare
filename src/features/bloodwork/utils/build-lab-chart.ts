import { convertToDateKey } from './dates';
import { convertToLabNumber } from './lab-values';

type ChartLog = {
  log_date: string;
  weight: number | string | null;
};

type ChartResult = {
  collected_on: string;
  albumin_globulin_ratio: number | string | null;
  hematocrit: number | string | null;
  bilirubin: number | string | null;
};

export type LabChartSeries = {
  dates: string[];
  weight: (number | null)[];
  albuminGlobulinRatio: (number | null)[];
  hematocrit: (number | null)[];
  bilirubin: (number | null)[];
};

type WeightPoint = {
  weight: number;
  at: number;
};

type LabPoint = {
  albuminGlobulinRatio: number | null;
  hematocrit: number | null;
  bilirubin: number | null;
};

const emptySeries = (): LabChartSeries => ({
  dates: [],
  weight: [],
  albuminGlobulinRatio: [],
  hematocrit: [],
  bilirubin: [],
});

const timestampFor = (value: string): number => {
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const buildLabChart = (
  logs: ChartLog[] | null | undefined,
  results: ChartResult[] | null | undefined,
): LabChartSeries => {
  const weights = new Map<string, WeightPoint>();
  const labs = new Map<string, LabPoint>();

  for (const log of logs ?? []) {
    const weight = convertToLabNumber(log.weight);
    if (weight == null) continue;

    const date = convertToDateKey(log.log_date);
    const at = timestampFor(log.log_date);
    const existing = weights.get(date);
    if (!existing || at >= existing.at) {
      weights.set(date, { weight, at });
    }
  }

  for (const result of results ?? []) {
    const date = convertToDateKey(result.collected_on);
    labs.set(date, {
      albuminGlobulinRatio: convertToLabNumber(result.albumin_globulin_ratio),
      hematocrit: convertToLabNumber(result.hematocrit),
      bilirubin: convertToLabNumber(result.bilirubin),
    });
  }

  const dates = Array.from(new Set([...weights.keys(), ...labs.keys()])).sort();
  if (dates.length === 0) return emptySeries();

  return {
    dates,
    weight: dates.map((date) => weights.get(date)?.weight ?? null),
    albuminGlobulinRatio: dates.map(
      (date) => labs.get(date)?.albuminGlobulinRatio ?? null,
    ),
    hematocrit: dates.map((date) => labs.get(date)?.hematocrit ?? null),
    bilirubin: dates.map((date) => labs.get(date)?.bilirubin ?? null),
  };
};

export const axisCeiling = (
  values: (number | null)[],
  floor: number,
): number => {
  let peak = floor;
  for (const value of values) {
    if (value != null && value > peak) peak = value;
  }
  return peak;
};

export const hasSeriesValue = (values: (number | null)[]): boolean =>
  values.some((value) => value != null);
