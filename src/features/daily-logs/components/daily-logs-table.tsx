import { memo, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog/dialog';
import { CustomTable } from '@/components/ui/table/custom-table';
import { TableCell, TableRow } from '@/components/ui/table/table';
import { formatDate } from '@/utils/format-dates';

import { useDailyLogs } from '../api/get-daily-logs';

import { DailyLogsForm } from './daily-log-form';
import { DeleteLogButton } from './delete-log-button';

type DailyLogTableProps = {
  catID?: string;
};

export const DailyLogsTable = memo(({ catID }: DailyLogTableProps) => {
  const headers = ['Day', 'Dose (ml)', 'Weight (kg)', 'Date', 'Brand', 'Note'];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { dailyLogs, isLoadingDailyLogs, totalLogsCount } = useDailyLogs(
    catID as string,
    page,
    rowsPerPage,
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0); // reset page to 0 when rows per page changes
  };
  const renderRow = (log: any) => {
    const { log_id, day, log_date, dose, weight, medication_name, note } = log;
    return (
      <TableRow
        key={log_id}
        className="group grid grid-cols-[repeat(7,minmax(100px,1fr))] items-center overflow-y-scroll"
      >
        <Dialog>
          <DialogTrigger>
            <TableCell>Day {day}</TableCell>
          </DialogTrigger>
          <DialogTrigger>
            <TableCell>{dose} ml</TableCell>
          </DialogTrigger>
          <DialogTrigger>
            <TableCell>{weight}</TableCell>
          </DialogTrigger>
          <DialogTrigger>
            <TableCell className="!w-max">
              {formatDate(new Date(log_date))}
            </TableCell>
          </DialogTrigger>
          <DialogTrigger>
            <TableCell className="">{medication_name}</TableCell>
          </DialogTrigger>
          <DialogTrigger className="min-w-60 overflow-scroll text-left">
            <TableCell>
              {note && note?.length > 200 ? note?.slice(0, 200) + '...' : note}
            </TableCell>
          </DialogTrigger>
          <DialogContent>
            <DailyLogsForm logID={log_id} />
          </DialogContent>
        </Dialog>
        <TableCell className="relative !right-0 z-10 hidden h-auto !max-w-min items-center justify-end rounded-md bg-primary p-0 group-hover:flex">
          <DeleteLogButton logID={log_id} />
        </TableCell>
      </TableRow>
    );
  };

  return (
    <CustomTable
      headers={headers}
      data={dailyLogs}
      isLoading={isLoadingDailyLogs}
      renderRow={renderRow}
      page={page}
      rowsPerPage={rowsPerPage}
      totalCount={totalLogsCount}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
});
DailyLogsTable.displayName = 'DailyLogsTable';
