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

// this form is used for both creating and updating log, which depends on whether there is a log_id or not
export const DailyLogsForm = ({ logID }: DailyLogsFormProps) => {
  const { catID } = useParams();
  const { toast } = useToast();

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

  return (
    <div>
      <DialogTitle className="mb-4">
        {logID ? 'Update daily log' : 'Create daily log'}
      </DialogTitle>
      <Form
        schema={dailyLogsSchema}
        onSubmit={({
          day,
          dose,
          weight,
          medication_name,
        }: Partial<DailyLog>) => {
          const dailyLog = {
            day,
            dose,
            weight,
            medication_name,
            log_date: new Date().toISOString(), // Auto-generate the date, this is keeping the user from inserting more logs per day
          };

          createDailyLog({ cat_id: catID, ...dailyLog });
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
                  Add new log
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
};
