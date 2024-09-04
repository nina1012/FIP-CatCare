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
import { useCatData } from '@/features/cat/api/get-cat-data';

import { useCreateDailyLog } from '../api/create-daily-log';
import { DailyLog } from '../types';

const dailyLogsSchema = z.object({
  day: z.string().optional().default('0'),
  dose: z.string(),
  weight: z.string().optional(),
  log_date: z.string().date(),
  medication_name: z.enum(['GS-15', 'GS-20']),
  note: z.string().optional(),
});

type DailyLogsFormProps = {
  logID?: string | null;
};

export const DailyLogsForm = ({ logID }: DailyLogsFormProps) => {
  const { catID } = useParams();

  const { catData } = useCatData(catID as string);
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
        description: error,
        variant: 'destructive',
      });
    },
  });

  return (
    <div>
      <DialogTitle>
        Create daily log for {catData?.name} {logID}
      </DialogTitle>
      <Form
        className="my-4"
        schema={dailyLogsSchema}
        onSubmit={({
          log_date,
          dose,
          weight,
          medication_name,
          note,
        }: Partial<DailyLog>) => {
          if (!catID) return;
          const dailyLog = {
            log_date,
            dose,
            weight,
            medication_name,
            note,
          };

          //   logID
          //     ? updateDailyLog({ cat_id, ...dailyLog })
          //     :
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
                placeholder="Day - 0"
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
              <Input
                registration={register('log_date')}
                type="text"
                placeholder="20/12/2024, 03:00:00"
                error={formState.errors['log_date']}
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
