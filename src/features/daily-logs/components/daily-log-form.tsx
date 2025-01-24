import { FileWarning } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/common/button';
import { Spinner } from '@/components/ui/common/spinner';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog/dialog';
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
import { useDailyLog } from '../api/get-daily-log';
import { useUpdateDailyLog } from '../api/update-daily-log';
import { DailyLog } from '../types';

const dailyLogsSchema = z.object({
  day: z.string().optional().default('0'),
  dose: z.string(),
  weight: z.string().optional(),
  medication_name: z.enum(['GS-15', 'GS-20', 'GS-30']),
  note: z.string().optional(),
});

type DailyLogsFormProps = {
  logID?: string | null;
};

export const DailyLogsForm = ({ logID }: DailyLogsFormProps) => {
  const { catID } = useParams();
  const { toast } = useToast();

  const { updateDailyLog, isPending: isUpdating } = useUpdateDailyLog(
    logID as string,
  );
  console.log(isUpdating);
  const { createDailyLog, isCreatingDailyLog: isCreating } = useCreateDailyLog({
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

  const { dailyLog } = useDailyLog(logID as string);

  if (!logID || !dailyLog) return;

  const handleSubmit = (formValues: Partial<DailyLog>) => {
    const logData = {
      ...dailyLog[0],
      ...formValues,
      cat_id: catID,
      log_date: !logID ? new Date().toISOString() : dailyLog[0].log_date,
      updated_at: logID ? new Date().toISOString() : dailyLog[0].updated_at,
    };

    if (logID) {
      updateDailyLog(logData);
    } else {
      createDailyLog(logData);
    }
  };

  const { weight, medication_name, dose, note, day } = dailyLog[0];

  return (
    <div>
      <DialogTitle className="mb-4">
        {logID ? 'Update daily log' : 'Create daily log'}
      </DialogTitle>
      <DialogDescription className="text-primary">
        Please fill all the inputs
      </DialogDescription>
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
          handleSubmit(values);
        }}
      >
        {({ register, formState, watch }) => {
          const selectedBrand = watch('medication_name');
          return (
            <>
              <Input
                registration={register('day')}
                type="text"
                defaultValue={day}
                placeholder="Day 0"
                error={formState.errors['day']}
                disabled
              />

              <Input
                registration={register('dose')}
                type="text"
                pattern="[0-9]+([\.,][0-9]+)?"
                defaultValue={dose || ''}
                placeholder="Dose of GS in mg"
                error={formState.errors['dose']}
              />

              <Input
                registration={register('weight')}
                type="text"
                defaultValue={weight || ''}
                placeholder="Weight in kg"
                error={formState.errors['weight']}
                pattern="[0-9]+([\.,][0-9]+)?"
                step="0.01"
              />

              <CustomSelect registration={register('medication_name')}>
                <SelectTrigger className="text-inherit">
                  <SelectValue
                    placeholder={
                      selectedBrand || medication_name || 'Select brand'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GS-15">GS-15</SelectItem>
                  <SelectItem value="GS-20">GS-20</SelectItem>
                  <SelectItem value="GS-30">GS-30</SelectItem>
                </SelectContent>
              </CustomSelect>

              <Textarea
                className="resize-none"
                placeholder="Enter today's symptoms"
                defaultValue={note || ''}
                registration={register('note')}
              ></Textarea>
              <div>
                <Button type="submit" className="w-full">
                  {!isUpdating ||
                    (isCreating && <Spinner size="sm" className="bg-white" />)}
                  {logID ? 'Update daily log' : 'Add new daily log'}
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
};
