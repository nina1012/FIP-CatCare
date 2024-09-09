import { DialogDescription, DialogTitle } from '@/components/ui/dialog/dialog';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs/tabs';

type VisualizationTabContentProps = {
  tabs: {
    label: string;
    icon: React.ReactNode;
    chartComponent: React.ReactNode;
  }[];
};

export const VisualizationTabContent = ({
  tabs,
}: VisualizationTabContentProps) => {
  return (
    <div className="">
      <div className="">
        <Tabs defaultValue={tabs[0].label}>
          <DialogTitle className="my-4">Cat&apos;s progress</DialogTitle>
          <DialogDescription>
            Visualize your cat&apos;s progress during treatment
          </DialogDescription>
          <TabsList className="my-4 flex min-w-8 max-w-fit flex-row justify-start">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.label}>
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.label} value={tab.label} className="">
              {tab.chartComponent}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
