import { memo, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog/dialog';
import { CustomTable } from '@/components/ui/table/custom-table';
import { TableCell, TableRow } from '@/components/ui/table/table';

import { useBloodwork } from '../api/get-bloodwork';
import { Bloodwork } from '../types';
import { formatChartDate } from '../utils/dates';
import { formatLabNumber } from '../utils/lab-values';

import { BloodworkForm } from './bloodwork-form';
import { DeleteBloodworkButton } from './delete-bloodwork-button';

const GRID_CLASS = 'grid-cols-[repeat(6,minmax(120px,1fr))]';

type BloodworkTableProps = {
  catID: string;
};

export const BloodworkTable = memo(({ catID }: BloodworkTableProps) => {
  const headers = [
    'Date',
    'A/G ratio',
    'Hematocrit (%)',
    'Bilirubin (mg/dL)',
    'Report',
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { bloodwork, isLoadingBloodwork, bloodworkError, totalCount } =
    useBloodwork({ catID, page, rowsPerPage });

  if (bloodworkError) {
    return (
      <p role="alert" className="text-sm text-red-500">
        Could not load bloodwork.{' '}
        {bloodworkError instanceof Error ? bloodworkError.message : ''}
      </p>
    );
  }

  const renderRow = (result: Bloodwork) => (
    <TableRow
      key={result.bloodwork_id}
      className={`group grid ${GRID_CLASS} items-center`}
    >
      <Dialog>
        <DialogTrigger>
          <TableCell>{formatChartDate(result.collected_on, true)}</TableCell>
        </DialogTrigger>
        <DialogTrigger>
          <TableCell>
            {formatLabNumber(result.albumin_globulin_ratio)}
          </TableCell>
        </DialogTrigger>
        <DialogTrigger>
          <TableCell>{formatLabNumber(result.hematocrit)}</TableCell>
        </DialogTrigger>
        <DialogTrigger>
          <TableCell>{formatLabNumber(result.bilirubin)}</TableCell>
        </DialogTrigger>
        <DialogContent>
          <BloodworkForm catID={catID} bloodworkID={result.bloodwork_id} />
        </DialogContent>
      </Dialog>
      <TableCell>
        {result.report_url ? (
          <a
            href={result.report_url}
            target="_blank"
            rel="noreferrer"
            className="text-primary underline"
          >
            View report
          </a>
        ) : (
          '—'
        )}
      </TableCell>
      <TableCell className="flex items-center justify-end">
        <DeleteBloodworkButton bloodworkID={result.bloodwork_id} />
      </TableCell>
    </TableRow>
  );

  return (
    <CustomTable
      headers={headers}
      data={bloodwork}
      isLoading={isLoadingBloodwork}
      renderRow={renderRow}
      caption="Bloodwork results"
      numOfCols={6}
      gridClassName={GRID_CLASS}
      page={page}
      rowsPerPage={rowsPerPage}
      totalCount={totalCount}
      onPageChange={setPage}
      onRowsPerPageChange={(rows) => {
        setRowsPerPage(rows);
        setPage(0);
      }}
    />
  );
});

BloodworkTable.displayName = 'BloodworkTable';
