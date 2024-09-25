import { DialogTitle } from '@radix-ui/react-dialog';

import { Card } from '@/components/ui/common/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog/dialog';
import { DailyLog } from '@/features/daily-logs/types';

import { Cat } from '../types';

import { TreatmentProgressBar } from './treatment-progress-bar';

type TreatmentProgressProps = {
  dailyLogs: DailyLog[] | null;
  catData?: Cat | null;
};

export const TreatmentProgressCard = ({
  dailyLogs,
  catData,
}: TreatmentProgressProps) => {
  if (!dailyLogs || !catData) return;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card title="Treatment progress info" className="bg-[#009688]/30">
          {dailyLogs?.length ? (
            <>
              <p>
                Today is day{' '}
                <span className="font-semibold">{dailyLogs?.length}</span> of
                treatment
              </p>
              <p>{84 - dailyLogs?.length} days left 💊</p>
            </>
          ) : (
            <p>{catData?.name} hasn&apos;t started treatment yet</p>
          )}
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Treatment progress
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <TreatmentProgressBar progress={(dailyLogs.length / 84) * 100} />
          <div className="text-primary">
            {((dailyLogs.length / 84) * 100).toFixed(1)}%
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
