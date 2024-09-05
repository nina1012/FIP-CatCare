import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/common/button';

import { useDeleteDailyLog } from '../api/delete-daily-log';

export const DeleteLogButton = ({ logID }: { logID: string }) => {
  const { deleteDailyLog, isPending } = useDeleteDailyLog();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this daily log?')) {
      deleteDailyLog(logID);
    }
  };
  return (
    <Button
      variant="ghost"
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Delete Log"
    >
      <Trash />
    </Button>
  );
};
