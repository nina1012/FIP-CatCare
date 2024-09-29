import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog/dialog';
import { CustomTable } from '@/components/ui/table/custom-table';
import { TableCell, TableRow } from '@/components/ui/table/table';

import { useBloodworks } from '../api/get-bloodworks';
import { Bloodwork } from '../types';

import { BloodworkForm } from './blood-work-form';

type BloodworkTableProps = {
  catID?: string;
};

export const BloodworkTable = ({ catID }: BloodworkTableProps) => {
  const { bloodworks, isLoadingBloodworks } = useBloodworks(catID as string);
  const renderRow = (bloodwork: Bloodwork) => {
    return (
      <TableRow
        key={bloodwork.bloodwork_id}
        className="group grid grid-cols-[repeat(2,minmax(150px,1fr))] items-center overflow-y-scroll"
      >
        <Dialog>
          <DialogTrigger>
            <TableCell>{bloodwork.test_date.toString()}</TableCell>
          </DialogTrigger>
          <DialogTrigger>
            <TableCell>{bloodwork.desciption}</TableCell>
          </DialogTrigger>
          <DialogContent>
            <BloodworkForm />
          </DialogContent>
        </Dialog>
      </TableRow>
    );
  };

  return (
    <CustomTable
      data={bloodworks as Bloodwork[]}
      isLoading={isLoadingBloodworks}
      headers={['Date', 'Description']}
      renderRow={renderRow}
      caption="A list of all bloodwork performed"
      numOfCols={2}
    />
  );
};
