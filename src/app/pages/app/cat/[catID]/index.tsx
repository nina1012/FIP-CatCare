import { Avatar } from '@radix-ui/react-avatar';
import { CheckCircle, LogsIcon, PawPrint } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { AvatarFallback, AvatarImage } from '@/components/ui/common/avatar';
import { Button } from '@/components/ui/common/button';
import { Spinner } from '@/components/ui/common/spinner';
import { CustomTabContent } from '@/components/ui/tabs/custom-tab-content';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs';
import { useCatData } from '@/features/cat/api/get-cat-data';
import { Badges } from '@/features/cat/components/badges';
import { TreatmentProgressCard } from '@/features/cat/components/treatment-cat-card';
import { UpdateCatDialog } from '@/features/cat/components/update-cat-dialog';
import { useDailyLogs } from '@/features/daily-logs/api/get-daily-logs';
import { DailyLogsForm } from '@/features/daily-logs/components/daily-log-form';
import { DailyLogsTable } from '@/features/daily-logs/components/daily-logs-table';
import { ChartCard } from '@/features/visualization/components/chart-card';

export const CatDetailsRoute = () => {
  const { catID } = useParams();
  const { catData, isLoadingCatData, catDataError } = useCatData(
    catID as string,
  );
  const { dailyLogs } = useDailyLogs(catID as string);

  if (!dailyLogs) return null;

  const isPendingTreatment = dailyLogs?.length > 0;

  if (isLoadingCatData) {
    return (
      <div className="container">
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (catDataError) {
    return (
      <div className="container">
        <div className="flex h-96 flex-col items-center justify-center gap-4">
          <h4 className="text-lg font-medium">
            Error has occured while fetching the cat&apos;s data
          </h4>
          <img
            className="h-auto max-w-32 object-cover object-center"
            src="/cat-404.jpg"
            alt="cat 404"
          />
          <Link to="/app/dashboard">
            <Button>
              <PawPrint className="mr-2" />
              Go back to dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* avatar / cat's image */}
      <div className="">
        <Avatar>
          <AvatarImage
            className="mx-auto size-28 rounded-full border-2 object-cover object-center"
            src={catData?.cat_image_url as string}
          />
          <AvatarFallback className="mx-auto flex size-28 gap-1  text-xs font-semibold">
            {catData?.name} <PawPrint size={12} />
          </AvatarFallback>
        </Avatar>
        <h4 className="text-center text-2xl font-bold">{catData?.name}</h4>
      </div>
      {/* BADGES */}
      <Badges isPendingTreatment={isPendingTreatment} />
      {/* CLICKABLE CARDS */}
      <div className="my-8 flex w-full flex-col gap-8 md:max-w-4xl md:flex-row md:*:w-[30%] md:*:min-w-[30%]">
        <UpdateCatDialog cat={catData} />
        <TreatmentProgressCard dailyLogs={dailyLogs} catData={catData} />
        <ChartCard dailyLogs={dailyLogs} catData={catData} />
      </div>
      {/* TABS AND TABLES*/}
      <div className="my-8">
        <Tabs defaultValue="daily-logs" className="">
          <TabsList>
            <TabsTrigger value="daily-logs">daily log</TabsTrigger>
            <TabsTrigger value="tasks">tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="daily-logs">
            <CustomTabContent
              label="daily log"
              formComponent={<DailyLogsForm />}
              icon={<LogsIcon />}
              tableComponent={
                <DailyLogsTable catID={catData?.cat_id as string} />
              }
            />
          </TabsContent>
          <TabsContent value="tasks">
            <CustomTabContent
              label="tasks"
              icon={<CheckCircle />}
              formComponent={<div>tasks form</div>}
              tableComponent={<div>tasks table</div>}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
