import { BarChart } from '@mui/x-charts';
import { PillBottle, WeightIcon } from 'lucide-react';

import { Card } from '@/components/ui/common/card';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog/dialog';
import { DailyLog } from '@/features/daily-logs/types';

import { Cat } from '../../cat/types';

import { VisualizationTabContent } from './visualization-tab-content';

type ChartCardProps = {
  dailyLogs: DailyLog[] | null;
  catData?: Cat | null;
};

export const ChartCard = ({ dailyLogs, catData }: ChartCardProps) => {
  if (!dailyLogs || !catData) return null;

  const days = Array.from({ length: 18 }, (_, i) => (i + 1) * 5); // get every 5th day - [0, 5, 10, 15, ... 85]

  const weightData = days.map((day) => {
    const log = dailyLogs.find((log) => log.day === day);
    return log && log.weight ? log.weight : 0;
  });

  const doseData = days.map((day) => {
    const log = dailyLogs.find((log) => log.day === day);
    return log && log.dose ? parseFloat(log.dose) : 0;
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card title="Progress visualized 📊" className="bg-[#dfb028]/30">
          <p>Progress visualized</p>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <VisualizationTabContent
          tabs={[
            {
              label: 'Weight Progress',
              icon: <WeightIcon />,
              chartComponent: (
                <BarChart
                  colors={['#c33c6d70']}
                  xAxis={[
                    {
                      min: 0,
                      max: Math.max(...days),
                      scaleType: 'band',
                      dataKey: 'day',
                      data: days,
                    },
                  ]}
                  series={[{ data: weightData, label: `Weight in kg` }]}
                  width={450}
                  height={400}
                />
              ),
            },
            {
              label: 'Dose Progress',
              icon: <PillBottle />,
              chartComponent: (
                <BarChart
                  colors={['#c33c6d70']}
                  xAxis={[
                    {
                      min: 0,
                      max: Math.max(...days),
                      scaleType: 'band',
                      dataKey: 'day',
                      data: days,
                    },
                  ]}
                  series={[{ data: doseData, label: `Dose in ml` }]}
                  width={450}
                  height={400}
                />
              ),
            },
          ]}
        />
      </DialogContent>
    </Dialog>
  );
};
