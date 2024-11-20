import { useAllDailyLogs } from '@/features/daily-logs/api/get-all-daily-logs';

import { Cat } from '../types';
import { checkForWeightLoss } from '../utils/checkWeight';
import { sendAlert } from '../utils/sendAlert';

type CatHealthMonitoringProps = {
  cat: Cat;
};

export const CatHealthMonitoring = ({ cat }: CatHealthMonitoringProps) => {
  // CatHealthMonitoring component tracks weight changes
  // additional health metrics will be added in future updates
  const { allDailyLogs } = useAllDailyLogs(cat.cat_id);

  if (!allDailyLogs || allDailyLogs.length === 0) {
    return (
      <div>
        <h1 className="text-lg">Health Monitoring for {cat.name}</h1>
        <p>
          No logs available. Start logging daily updates to monitor {cat.name}
          &apos;s health progress.
        </p>
      </div>
    );
  }

  if (allDailyLogs.length < 7) {
    return (
      <div>
        <h3 className="my-2 text-lg">Health Monitoring for {cat.name}</h3>
        <p>
          Health monitoring requires at least 7 days of daily logs. Currently,
          you have only {allDailyLogs.length} logs. Keep logging daily to enable
          monitoring and warnings.
        </p>
      </div>
    );
  }

  const weightChange = checkForWeightLoss(allDailyLogs);

  if (!weightChange) {
    return (
      <div>
        <h3 className="my-2 text-lg">Health Monitoring for {cat.name}</h3>
        <p>
          Everything is just fine and your {cat.name}&apos;s progress is
          purrfect! Good job! 🐾 ✨
        </p>
      </div>
    );
  }

  if (weightChange) {
    // send alert to owner about weight loss
    sendAlert();
  }

  return (
    <div>
      <h3 className="text-base font-medium">
        Health Monitoring for {cat.name}
      </h3>

      <div className="text-red-400">
        {weightChange &&
          "Warning, we've noticed that your cat has lost weight in the past 7 days!"}
      </div>
      {/* More health details will be here */}
    </div>
  );
};
