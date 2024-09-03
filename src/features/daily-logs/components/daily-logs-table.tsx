import { Spinner } from '@/components/ui/common/spinner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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

import { useDailyLogs } from '../api/get-daily-logs';

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
    <Table className="overflow-x-scroll ">
      {/* each of the table rows can be clickable and by clicking a log, the dialog will open up and user can update daily log for that day */}
      <TableCaption>A list of your daily logs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Day</TableHead>
          <TableHead>Dose</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead className="text-right">Date</TableHead>
          <TableHead className="text-right">Brand</TableHead>
          <TableHead className="text-right">Note</TableHead>
        </TableRow>
      </TableHeader>
      <Dialog>
        {dailyLogs.map((log) => {
          const {
            log_id,
            day,
            log_date,
            dose,
            weight,
            medication_name,
            note,
            cat_id,
          } = log;
          return (
            <>
              <TableBody>
                <DialogTrigger key={log_id} className="w-full">
                  <TableRow>
                    <TableCell className="font-medium">{day}</TableCell>
                    <TableCell>{dose}</TableCell>
                    <TableCell>{weight}</TableCell>
                    <TableCell className="text-right">{log_date}</TableCell>
                    <TableCell className="text-right">
                      {medication_name}
                    </TableCell>
                    <TableCell className="text-right">{note}</TableCell>
                  </TableRow>
                </DialogTrigger>
              </TableBody>
              <DialogContent>
                <div>Daily logs form for updating day renders here</div>
              </DialogContent>
              <Dialog>
                <DialogTrigger></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogDescription>
                      <div>
                        form for updating daily log should render here...
                        {cat_id}
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </>
          );
        })}
      </Dialog>
    </Table>
  );
};
