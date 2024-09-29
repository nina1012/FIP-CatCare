import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog/dialog';
import { CustomTable } from '@/components/ui/table/custom-table';
import { TableCell, TableRow } from '@/components/ui/table/table';
import { formatDate } from '@/utils/format-dates';

import { useDailyLogs } from '../api/get-daily-logs';
import { DailyLog } from '../types';

import { DailyLogsForm } from './daily-log-form';
import { DeleteLogButton } from './delete-log-button';

type DailyLogTableProps = {
  catID?: string;
};

export const DailyLogsTable = ({ catID }: DailyLogTableProps) => {
  const { dailyLogs, isLoadingDailyLogs } = useDailyLogs(catID as string);

  const headers = ['Day', 'Dose (mg)', 'Weight (kg)', 'Date', 'Brand', 'Note'];

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
            <TableCell>{dose}</TableCell>
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
      data={dailyLogs as DailyLog[]}
      isLoading={isLoadingDailyLogs}
      headers={headers}
      renderRow={renderRow}
      caption="A list of your daily logs"
    />
  );
};
