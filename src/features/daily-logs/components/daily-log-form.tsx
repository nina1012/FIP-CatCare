import { z } from 'zod';

import { Button } from '@/components/ui/common/button';
import { DialogTitle } from '@/components/ui/dialog/dialog';
import { Form, Input, Label } from '@/components/ui/form';
import CustomSelect from '@/components/ui/form/custom-select';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/form/select';
import { useCatData } from '@/features/cat/api/get-cat-data';

const dailyLogsSchema = z.object({
  day: z.string().optional().default('0'),
  dose: z.string(),
  weight: z.string().optional(),
  date: z.string().date(),
  brand: z.enum(['GS-15', 'GS-20']),
});

type DailyLogsFormProps = {
  catID?: string | null;
};

export const DailyLogsForm = ({ catID }: DailyLogsFormProps) => {
  const { catData } = useCatData(catID as string);

  return (
    <div>
      <DialogTitle>Create daily log for {catData?.name}</DialogTitle>
      <Form schema={dailyLogsSchema} onSubmit={(values) => console.log(values)}>
        {({ register, formState, watch }) => {
          const selectedBrand = watch('brand');
          console.log(formState.errors);
          return (
            <>
              <Label>
                Day
                <Input
                  registration={register('day')}
                  type="text"
                  placeholder="0"
                  error={formState.errors['day']}
                  disabled
                />
              </Label>
              <Label>
                Dose
                <Input
                  registration={register('dose')}
                  type="text"
                  placeholder="Dose of GS in mg"
                  error={formState.errors['dose']}
                />
              </Label>
              <Label>
                Weight
                <Input
                  registration={register('weight')}
                  type="text"
                  placeholder="Weight in kg"
                  error={formState.errors['weight']}
                />
              </Label>
              <Label>
                Date
                <Input
                  registration={register('date')}
                  type="text"
                  placeholder="20/12/2024, 03:00:00"
                  error={formState.errors['date']}
                />
              </Label>
              <Label>
                Brand
                <CustomSelect registration={register('brand')}>
                  <SelectTrigger className="text-inherit">
                    <SelectValue
                      placeholder={selectedBrand || 'Select brand'}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GS-15">GS-15</SelectItem>
                    <SelectItem value="GS-20">GS-20</SelectItem>
                  </SelectContent>
                </CustomSelect>
              </Label>

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
