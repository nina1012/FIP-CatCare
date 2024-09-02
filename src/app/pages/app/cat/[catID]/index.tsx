import { Avatar } from '@radix-ui/react-avatar';
import { DialogContent } from '@radix-ui/react-dialog';
import { PawPrint } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { AvatarFallback, AvatarImage } from '@/components/ui/common/avatar';
import { Badge } from '@/components/ui/common/badge';
import { Button } from '@/components/ui/common/button';
import { Spinner } from '@/components/ui/common/spinner';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/common/tabs';
import { Dialog, DialogTrigger } from '@/components/ui/dialog/dialog';
import { useCatData } from '@/features/cat/api/get-cat-data';
import { UpdateCatDialog } from '@/features/cat/components/update-cat-dialog';
import { DailyLogsTable } from '@/features/daily-logs/components/daily-logs-table';

export const CatDetailsRoute = () => {
  const { catID } = useParams();
  const { catData, isLoadingCatData, catDataError } = useCatData(
    catID as string,
  );

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
    <div className="container relative">
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

      {/* Badges, for now there are hardcoded badges */}
      {/* badges will depend on cat's current status */}
      <div className="pointer-events-none my-4 flex justify-center gap-4 *:text-[10px]">
        <Badge>TRIAL</Badge>
        <Badge>Compliant</Badge>
        <Badge>Pending Treatment</Badge>
      </div>
      {/* here will go cards that will be clickable and by clicking the card, it should open up the dialog for editing the information */}
      <div className="my-8 flex w-full flex-col gap-8 md:max-w-4xl md:flex-row md:*:w-[30%] md:*:min-w-[30%]">
        <UpdateCatDialog cat={catData} />
        <UpdateCatDialog cat={catData} />
        <UpdateCatDialog cat={catData} />
      </div>
      <div className="my-8">
        <Tabs defaultValue="daily-logs" className="">
          <TabsList>
            <TabsTrigger value="daily-logs">daily log</TabsTrigger>
            <TabsTrigger value="tasks">tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="daily-logs" className="flex flex-col gap-4">
            <p className="w-full rounded-sm border border-[#1f8caf] bg-[#1f8caf]/10 p-2 text-xs">
              Calculate your daily log by clicking New Record, input the weight,
              then click Calculate Dose
            </p>

            <DailyLogsTable />
          </TabsContent>
        </Tabs>
      </div>
      <Dialog>
        <DialogTrigger>
          <Button>New Record</Button>
        </DialogTrigger>
        <DialogContent>Here goes the form for adding daily log</DialogContent>
      </Dialog>
    </div>
  );
};
