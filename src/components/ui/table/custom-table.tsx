import { TablePagination } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import clsx from 'clsx';

import { Spinner } from '@/components/ui/common/spinner';
import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table';

type CustomTableProps<T> = {
  data: T[];
  isLoading: boolean;
  headers: string[];
  renderRow: (item: T) => React.ReactNode;
  caption?: string;
  numOfCols?: number;
  // for pagination
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (rows: number) => void;
};

export const CustomTable = <T,>({
  data,
  isLoading,
  headers,
  renderRow,
  caption = 'A list of records',
  numOfCols = 7,
  page,
  totalCount,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: CustomTableProps<T>) => {
  const handlePageChange = (_event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="container">
        <div className="flex h-96 items-center justify-center">
          <h3>No data to show</h3>
        </div>
      </div>
    );
  }

  return (
    <Table className="grid w-full grid-rows-2 sm:overflow-x-scroll">
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow
          className={clsx(
            'grid',
            numOfCols === 7
              ? `grid-cols-[repeat(7,minmax(150px,1fr))]`
              : 'grid-cols-[repeat(2,minmax(150px,1fr))]',
          )}
        >
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
      {/* MUI Components */}
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            colSpan={numOfCols}
            rowsPerPage={rowsPerPage}
            page={page}
            count={totalCount}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
};
