import { Button } from '@/components/ui/common/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/dialog/dialog';

type CustomTabContent = {
  label: string;
  formComponent: React.ReactNode;
  tableComponent: React.ReactNode;
  icon: React.ReactNode;
};

export const CustomTabContent = ({
  label,
  formComponent,
  tableComponent,
  icon,
}: CustomTabContent) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="my-4 flex flex-col gap-2">
        <p className="-order-1 rounded-sm border border-[#1f8caf] bg-[#1f8caf]/10 p-2 text-xs">
          Click each row to update {label}
        </p>
      </div>
      <div className="max-w-sm">
        <Dialog>
          <DialogTrigger>
            <Button>
              {icon}
              <span className="ml-2">New {label}</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>{formComponent}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {tableComponent}
    </div>
  );
};
