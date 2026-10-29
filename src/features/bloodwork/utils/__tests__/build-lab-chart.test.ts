import { describe, expect, it } from 'vitest';

import { buildLabChart } from '../build-lab-chart';

describe('buildLabChart', () => {
  it('plots lab values on the same dates as weight', () => {
    const series = buildLabChart(
      [
        { log_date: '2024-09-01T12:00:00.000Z', weight: 3.2 },
        { log_date: '2024-09-15T12:00:00.000Z', weight: 3.4 },
        { log_date: '2024-09-29T12:00:00.000Z', weight: 3.6 },
      ],
      [
        {
          collected_on: '2024-09-15',
          albumin_globulin_ratio: 0.45,
          hematocrit: 28,
          bilirubin: 0.8,
        },
      ],
    );

    expect(series.dates).toEqual(['2024-09-01', '2024-09-15', '2024-09-29']);
    expect(series.weight).toEqual([3.2, 3.4, 3.6]);
    expect(series.albuminGlobulinRatio).toEqual([null, 0.45, null]);
    expect(series.hematocrit).toEqual([null, 28, null]);
    expect(series.bilirubin).toEqual([null, 0.8, null]);
  });

  it('keeps a lab date that has no weight log', () => {
    const series = buildLabChart(
      [{ log_date: '2024-09-01T12:00:00.000Z', weight: 3.1 }],
      [
        {
          collected_on: '2024-10-01',
          albumin_globulin_ratio: 0.7,
          hematocrit: 32,
          bilirubin: 0.2,
        },
      ],
    );

    expect(series.dates).toEqual(['2024-09-01', '2024-10-01']);
    expect(series.weight).toEqual([3.1, null]);
    expect(series.albuminGlobulinRatio).toEqual([null, 0.7]);
  });

  it('coerces numeric strings and keeps the latest weight for a day', () => {
    const series = buildLabChart(
      [
        { log_date: '2024-09-15T12:00:00.000Z', weight: '3.10' },
        { log_date: '2024-09-15T18:00:00.000Z', weight: '3.50' },
      ],
      [
        {
          collected_on: '2024-09-15',
          albumin_globulin_ratio: '0.450',
          hematocrit: '28.00',
          bilirubin: '0.800',
        },
      ],
    );

    expect(series.dates).toEqual(['2024-09-15']);
    expect(series.weight).toEqual([3.5]);
    expect(series.albuminGlobulinRatio).toEqual([0.45]);
    expect(series.hematocrit).toEqual([28]);
    expect(series.bilirubin).toEqual([0.8]);
  });

  it('skips daily logs that have no weight', () => {
    const series = buildLabChart(
      [{ log_date: '2024-09-01T12:00:00.000Z', weight: null }],
      [],
    );

    expect(series.dates).toEqual([]);
  });
});
