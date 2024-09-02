import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table';

export const DailyLogsTable = () => {
  const date = new Date();
  return (
    <Table>
      {/* each of the table rows can be clickable and by clicking a log, the dialog will open up and user can update daily log for that day */}
      <TableCaption>A list of your daily logs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Day</TableHead>
          <TableHead>Dose</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead className="text-right">Date</TableHead>
          <TableHead className="text-right">Brand</TableHead>
          <TableHead className="text-right">Comment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">0</TableCell>
          <TableCell>0.5mg</TableCell>
          <TableCell>2.300 kg</TableCell>
          <TableCell className="text-right">
            {date.toLocaleString('en-GB', { timeZone: 'UTC' })}
          </TableCell>
          <TableCell className="text-right">GS-20</TableCell>
          <TableCell className="text-right">
            Comment content goes here
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
