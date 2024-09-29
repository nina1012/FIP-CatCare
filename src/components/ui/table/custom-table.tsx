import { Spinner } from '@/components/ui/common/spinner';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table';

// I put the generic because I want to reuse this custom table for my daily-logs, bloodwork, ...
// so the table can take as props different types (DailyLog i.e.)
type CustomTableProps<T> = {
  data: T[]; // for daily-logs -> DailyLogs[]
  isLoading: boolean;
  headers: string[]; // headers for each column in table
  renderRow: (item: T) => React.ReactNode;
  caption?: string;
};

export const CustomTable = <T,>({
  data,
  isLoading,
  headers,
  renderRow,
  caption = 'A list of records',
}: CustomTableProps<T>) => {
  if (isLoading) {
    return (
      <div className="container">
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container">
        <div className="flex h-96 items-center justify-center">
          <h3>No data to show </h3>
        </div>
      </div>
    );
  }

  return (
    <Table className="grid w-full grid-rows-2 sm:overflow-x-scroll">
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow className="grid grid-cols-[repeat(7,minmax(100px,1fr))]">
          {headers.map((header) => (
            <TableHead key={header} className="!p-4 text-base font-semibold">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map(renderRow)
        ) : (
          <div className="my-4 flex justify-center text-base">
            No data to show
          </div>
        )}
      </TableBody>
    </Table>
  );
};
