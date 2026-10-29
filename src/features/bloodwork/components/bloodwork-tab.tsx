import { TestTube } from 'lucide-react';

import { CustomTabContent } from '@/components/ui/tabs/custom-tab-content';
import { DailyLog } from '@/features/daily-logs/types';

import { BloodworkForm } from './bloodwork-form';
import { BloodworkTable } from './bloodwork-table';

type BloodworkTabProps = {
  catID: string;
  dailyLogs: Pick<DailyLog, 'log_date' | 'weight'>[] | null;
};

export const BloodworkTab = ({ catID }: BloodworkTabProps) => {
  return (
    <div className="my-4 flex flex-col gap-6">
      {/* TODO: add graph here mayeb */}
      <CustomTabContent
        label="bloodwork"
        icon={<TestTube />}
        formComponent={<BloodworkForm catID={catID} />}
        tableComponent={<BloodworkTable catID={catID} />}
      />
    </div>
  );
};
