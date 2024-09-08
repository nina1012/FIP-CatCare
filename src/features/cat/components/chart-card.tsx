import { BarChart } from '@mui/x-charts/BarChart';

import { Card } from '@/components/ui/common/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs';
import { DailyLog } from '@/features/daily-logs/types';

import { Cat } from '../types';

type ChartCardProps = {
  dailyLogs: DailyLog[] | null;
  catData?: Cat | null;
};

export const ChartCard = ({ dailyLogs, catData }: ChartCardProps) => {
  if (!dailyLogs || !catData) return;
  const weightData = dailyLogs.map((log) => log.weight);
  console.log(weightData);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card title="Progress visualized 📊" className="bg-[#dfb028]/30">
          <p>Progress visualized</p>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>weight gain during treatment</DialogTitle>
        <Tabs defaultValue="weight">
          <DialogHeader>
            <TabsList className="flex min-w-8 max-w-44 flex-row justify-start">
              <TabsTrigger value="weight">weight</TabsTrigger>
            </TabsList>
          </DialogHeader>
          <DialogDescription>
            <TabsContent value="weight">
              <BarChart
                colors={['#c33c6d']}
                xAxis={[
                  {
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
                width={400}
                height={300}
              />{' '}
            </TabsContent>
          </DialogDescription>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
