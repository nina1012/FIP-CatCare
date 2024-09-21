import { Spinner } from '@/components/ui/common/spinner';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog/dialog';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table';
import { formatDate } from '@/utils/format-dates';

import { useDailyLogs } from '../api/get-daily-logs';

import { DailyLogsForm } from './daily-log-form';
import { DeleteLogButton } from './delete-log-button';

type DailyLogTableProps = {
  catID?: string;
};

export const DailyLogsTable = ({ catID }: DailyLogTableProps) => {
  const { dailyLogs, isLoadingDailyLogs } = useDailyLogs(catID as string);

  if (!dailyLogs) return;
  if (isLoadingDailyLogs) {
    return (
      <div className="container">
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <Table className=" grid w-full grid-rows-2 sm:overflow-x-scroll ">
      {/* each of the table rows can be clickable and by clicking a log, the dialog will open up and user can update daily log for that day */}
      <TableCaption>A list of your daily logs</TableCaption>
      <TableHeader>
        <TableRow className="grid grid-cols-[repeat(6,minmax(100px,1fr)),50px]">
          <TableHead>Day</TableHead>
          <TableHead>Dose (mg)</TableHead>
          <TableHead>Weight (kg)</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dailyLogs.map((log) => {
          const { log_id, day, log_date, dose, weight, medication_name, note } =
            log;
          return (
            <TableRow
              key={log_id}
              className="group relative grid grid-cols-[repeat(6,minmax(100px,1fr)),50px] items-center "
            >
              <Dialog>
                <DialogTrigger className="">
                  <TableCell className="font-medium">{day}</TableCell>
                </DialogTrigger>
                <DialogTrigger className="">
                  <TableCell>{dose}</TableCell>
                </DialogTrigger>
                <DialogTrigger className="">
                  <TableCell className="font-medium">{weight}</TableCell>
                </DialogTrigger>
                <DialogTrigger className="w-[150px]">
                  <TableCell>{formatDate(new Date(log_date))}</TableCell>
                </DialogTrigger>
                <DialogTrigger>
                  <TableCell className="">{medication_name}</TableCell>
                </DialogTrigger>
                <DialogTrigger className="min-w-60 overflow-scroll text-left">
                  <TableCell>
                    {note && note?.length > 200
                      ? note?.slice(0, 200) + '...'
                      : note}
                  </TableCell>
                </DialogTrigger>
                <DialogContent>
                  <DailyLogsForm logID={log_id} />
                </DialogContent>
              </Dialog>
              <TableCell className="absolute !right-0 z-10 hidden h-auto !max-w-min items-center !justify-end rounded-md bg-primary p-0 group-hover:flex">
                <DeleteLogButton logID={log_id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
