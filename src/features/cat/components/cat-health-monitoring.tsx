import { useAllDailyLogs } from '@/features/daily-logs/api/get-all-daily-logs';

import { Cat } from '../types';
import { checkForWeightLoss } from '../utils/checkWeight';

type CatHealthMonitoringProps = {
  cat: Cat;
};

export const CatHealthMonitoring = ({ cat }: CatHealthMonitoringProps) => {
  const { allDailyLogs } = useAllDailyLogs(cat.cat_id);

  // This component should notify the cat's owner about the progress of the treatment
  // for now it only monitors the weight changes
  const weightChange = checkForWeightLoss(allDailyLogs);
  console.log(weightChange);
  return (
    <div>
      <div>
        <h1 className="text-lg">Health Monitoring for {cat.name}</h1>
        <div style={{ color: 'red' }}>
          {weightChange &&
            "Warning, we've noticed that your cat has lost weight in past 7 days"}
        </div>
        {/* more health details */}
      </div>
    </div>
  );
};
