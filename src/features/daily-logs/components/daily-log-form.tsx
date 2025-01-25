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
  day: z.string().optional().default(''),
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

  const { updateDailyLog, isPending: isUpdating } = useUpdateDailyLog(logID!);
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

  const { dailyLog, isLoading } = useDailyLog(logID as string);

  const handleSubmit = (data: Partial<DailyLog>) => {
    if (logID) {
      updateDailyLog({ log_id: logID, ...data, cat_id: catID });
    } else {
      createDailyLog({ cat_id: catID, ...data });
    }
  };

  if (logID && isLoading) {
    return <Spinner size="lg" className="mx-auto" />;
  }

  const defaultValues = logID ? (dailyLog?.[0] as DailyLog) : ({} as DailyLog); // added defaultValues in order to get rid of the errors that used to happen when user want to create new daily log

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
            You can only post a daily log once a day. If you try to add more
            logs, the app will crash and you&apos;ll need to refresh the page!
          </p>
        </div>
      )}
      <Form
        schema={dailyLogsSchema}
        onSubmit={(values: Partial<DailyLog>) => handleSubmit(values)}
      >
        {({ register, formState, watch }) => {
          const selectedBrand =
            watch('medication_name') || defaultValues.medication_name;

          return (
            <>
              <Input
                registration={register('day')}
                type="text"
                defaultValue={defaultValues.day || ''}
                placeholder="Day 0"
                error={formState.errors['day']}
                disabled
              />

              <Input
                registration={register('dose')}
                type="text"
                pattern="[0-9]+([\.,][0-9]+)?"
                defaultValue={defaultValues.dose || ''}
                placeholder="Dose of GS in mg"
                error={formState.errors['dose']}
              />

              <Input
                registration={register('weight')}
                type="text"
                pattern="[0-9]+([\.,][0-9]+)?"
                defaultValue={defaultValues.weight || ''}
                placeholder="Weight in kg"
                error={formState.errors['weight']}
                step="0.01"
              />

              <CustomSelect registration={register('medication_name')}>
                <SelectTrigger className="text-inherit">
                  <SelectValue placeholder={selectedBrand || 'Select brand'} />
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
                defaultValue={defaultValues.note || ''}
                registration={register('note')}
              ></Textarea>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isUpdating || isCreating}
                >
                  {(isUpdating || isCreating) && (
                    <Spinner size="sm" className="bg-white" />
                  )}
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
