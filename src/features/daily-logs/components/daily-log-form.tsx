import { FileWarning } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/common/button';
import { DialogTitle } from '@/components/ui/dialog/dialog';
import { Form, Input } from '@/components/ui/form';
import CustomSelect from '@/components/ui/form/custom-select';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/form/select';
import { Textarea } from '@/components/ui/form/textarea';
import { useToast } from '@/components/ui/toast/use-toast';

import { useCreateDailyLog } from '../api/create-daily-log';
import { useUpdateDailyLog } from '../api/update-daily-log';
import { DailyLog } from '../types';

const dailyLogsSchema = z.object({
  day: z.string().optional().default('0'),
  dose: z.string(),
  weight: z.string().optional(),
  medication_name: z.enum(['GS-15', 'GS-20']),
  note: z.string().optional(),
});

type DailyLogsFormProps = {
  logID?: string | null;
};

export const DailyLogsForm = ({ logID }: DailyLogsFormProps) => {
  const { catID } = useParams();
  const { toast } = useToast();

  const { updateDailyLog } = useUpdateDailyLog(logID as string);
  const { createDailyLog } = useCreateDailyLog({
    onSuccess: () => {
      toast({
        title: 'Successful',
        description: 'You have successfully added a new daily log 😊',
      });
    },
    onError: (error: string) => {
      toast({
        title: 'Unsuccessful',
        description: error || 'You can only create one log per day.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (dailyLog: Partial<DailyLog>) => {
    if (logID) {
      updateDailyLog({ log_id: logID, ...dailyLog, cat_id: catID });
    } else {
      createDailyLog({ cat_id: catID, ...dailyLog });
    }
  };

  return (
    <div>
      <DialogTitle className="mb-4">
        {logID ? 'Update daily log' : 'Create daily log'}
      </DialogTitle>
      {!logID && (
        <div className="my-4 flex w-full flex-col gap-2 rounded-sm border border-[#dfb028] bg-[#dfb028]/40 p-2 py-4 text-xs">
          <FileWarning className="mx-auto" />
          <p>
            You can only post a daily log once a day, if you try to add more
            logs, the app will crash and you&apos;ll need to refresh the page!
          </p>
        </div>
      )}
      <Form
        schema={dailyLogsSchema}
        onSubmit={(values: Partial<DailyLog>) => {
          handleSubmit({
            log_date: new Date().toISOString(), // Auto-generate the date to ensure only one log per day
            ...values,
          });
        }}
      >
        {({ register, formState, watch }) => {
          const selectedBrand = watch('medication_name');
          return (
            <>
              <Input
                registration={register('day')}
                type="text"
                placeholder="Day 0"
                error={formState.errors['day']}
                disabled
              />

              <Input
                registration={register('dose')}
                type="text"
                placeholder="Dose of GS in mg"
                error={formState.errors['dose']}
              />

              <Input
                registration={register('weight')}
                type="text"
                placeholder="Weight in kg"
                error={formState.errors['weight']}
              />

              <CustomSelect registration={register('medication_name')}>
                <SelectTrigger className="text-inherit">
                  <SelectValue placeholder={selectedBrand || 'Select brand'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GS-15">GS-15</SelectItem>
                  <SelectItem value="GS-20">GS-20</SelectItem>
                </SelectContent>
              </CustomSelect>

              <Textarea
                className="resize-none"
                placeholder="Enter today's symptoms"
                registration={register('note')}
              ></Textarea>
              <div>
                <Button type="submit" className="w-full">
                  {logID ? 'Update Log' : 'Add new log'}
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
};
