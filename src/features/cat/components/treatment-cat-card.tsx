import { DialogTitle } from '@radix-ui/react-dialog';

import { Card } from '@/components/ui/common/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog/dialog';
import { useAllDailyLogs } from '@/features/daily-logs/api/get-all-daily-logs';
import { DailyLog } from '@/features/daily-logs/types';

import { Cat } from '../types';

import { CatHealthMonitoring } from './cat-health-monitoring';
import { TreatmentProgressBar } from './treatment-progress-bar';

type TreatmentProgressProps = {
  dailyLogs: DailyLog[] | null;
  catData?: Cat | null;
};

export const TreatmentProgressCard = ({
  dailyLogs,
  catData,
}: TreatmentProgressProps) => {
  const { allDailyLogs } = useAllDailyLogs(catData?.cat_id as string);
  if (!dailyLogs || !catData || !allDailyLogs) return null;

  const progressPercentage = ((allDailyLogs.length / 84) * 100).toFixed(1);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          title="Treatment Progress & Monitoring"
          className="bg-[#009688]/30"
        >
          <div className="flex flex-col items-start gap-2 !text-left">
            {dailyLogs?.length ? (
              <>
                <p>
                  Today is day{' '}
                  <span className="font-semibold text-primary">
                    {allDailyLogs?.length}
                  </span>{' '}
                  of treatment.
                </p>
                <p>
                  Only{' '}
                  <span className="font-semibold text-primary">
                    {84 - allDailyLogs?.length}
                  </span>{' '}
                  days left 💊
                </p>
                <div className="mt-4 w-full">
                  <TreatmentProgressBar progress={Number(progressPercentage)} />
                </div>
              </>
            ) : (
              <p className="text-center">
                {catData?.name} hasn&apos;t started treatment yet.
              </p>
            )}
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Treatment Progress & Monitoring
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="items-start space-y-6">
            {/* Treatment Progress */}
            <div>
              <h3 className="text-base font-medium">Treatment Progress</h3>
              <TreatmentProgressBar progress={Number(progressPercentage)} />
              <p className="mt-2 text-primary">
                {progressPercentage}% completed
              </p>
              <p>
                {84 - dailyLogs?.length} days left in the treatment for{' '}
                {catData.name}.
              </p>
            </div>

            {/* Health Monitoring */}
            <div>
              <CatHealthMonitoring cat={catData} />
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
