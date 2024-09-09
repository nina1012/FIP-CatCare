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
  if (!dailyLogs || !catData) return;
  const days = [
    'Day 0',
    'Day 5',
    'Day 10',
    'Day 15',
    'Day 20',
    'Day 25',
    'Day 30',
    'Day 35',
    'Day 40',
    'Day 45',
    'Day 50',
    'Day 55',
    'Day 60',
    'Day 65',
    'Day 70',
    'Day 75',
    'Day 80',
    'Day 85',
  ].map((day) => +day.split(' ')[1]);

  const weightData = dailyLogs.map((log, i) =>
    days[i] === i ? log.weight : 0,
  );
  const doseData = dailyLogs.map((log, i) => {
    if (log.dose) {
      return days[i] === i ? parseFloat(log?.dose) : 0;
    }
    return 0;
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
                  colors={['#1f8caf']}
                  xAxis={[
                    {
                      min: 0.3,
                      max: 10,
                      scaleType: 'band',
                      dataKey: 'day',
                      data: [
                        'Day 0',
                        'Day 5',
                        'Day 10',
                        'Day 15',
                        'Day 20',
                        'Day 25',
                        'Day 30',
                        'Day 35',
                        'Day 40',
                        'Day 45',
                        'Day 50',
                        'Day 55',
                        'Day 60',
                        'Day 65',
                        'Day 70',
                        'Day 75',
                        'Day 80',
                        'Day 85',
                      ],
                    },
                  ]}
                  series={[{ data: weightData, label: `weight in kg` }]}
                  width={450}
                  className="size-auto overflow-hidden"
                  height={400}
                />
              ),
            },
            {
              label: 'Dose Progress',
              icon: <PillBottle />,
              chartComponent: (
                <BarChart
                  colors={['#1f8caf']}
                  xAxis={[
                    {
                      min: 0.05,
                      max: 100,
                      tickLabelInterval: 'auto',
                      scaleType: 'band',
                      dataKey: 'day',
                      data: [
                        'Day 0',
                        'Day 5',
                        'Day 10',
                        'Day 15',
                        'Day 20',
                        'Day 25',
                        'Day 30',
                        'Day 35',
                        'Day 40',
                        'Day 45',
                        'Day 50',
                        'Day 55',
                        'Day 60',
                        'Day 65',
                        'Day 70',
                        'Day 75',
                        'Day 80',
                        'Day 85',
                      ],
                    },
                  ]}
                  series={[{ data: doseData, label: `dose in ml` }]}
                  width={450}
                  className="size-auto overflow-hidden"
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
