import { FileWarning } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/common/button';
import { Spinner } from '@/components/ui/common/spinner';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog/dialog';
import { Form, Input } from '@/components/ui/form';
import { FieldWrapper } from '@/components/ui/form/field-wrapper';
import {
  Select,
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

const medicationBrands = ['GS-15', 'GS-20', 'GS-30'] as const;

const dailyLogsSchema = z.object({
  dose: z.string().trim().min(1, 'Enter the dose'),
  weight: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || Number.isFinite(Number(value.replace(',', '.'))),
      'Enter a valid weight',
    ),
  medication_name: z.enum(medicationBrands, {
    errorMap: () => ({ message: 'Select a medication brand' }),
  }),
  note: z.string().optional(),
});

type DailyLogFormValues = z.infer<typeof dailyLogsSchema>;

const isMedicationBrand = (
  value: string | null | undefined,
): value is (typeof medicationBrands)[number] =>
  medicationBrands.some((brand) => brand === value);

const parseWeight = (weight?: string) => {
  if (!weight) return null;
  const parsed = Number(weight.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
};

type DailyLogsFormProps = {
  logID?: string | null;
};

export const DailyLogsForm = ({ logID }: DailyLogsFormProps) => {
  const { catID } = useParams();
  const { toast } = useToast();

  const { updateDailyLog, isPending: isUpdating } = useUpdateDailyLog(
    logID ?? '',
    {
      onSuccess: () => {
        toast({
          title: 'Successful',
          description: 'Daily log updated.',
        });
      },
      onError: (message) => {
        toast({
          title: 'Unsuccessful',
          description: message,
          variant: 'destructive',
        });
      },
    },
  );
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

  const handleSubmit = (data: DailyLogFormValues) => {
    const payload = {
      dose: data.dose,
      weight: parseWeight(data.weight),
      medication_name: data.medication_name,
      note: data.note?.trim() ? data.note : null,
    };

    if (logID) {
      updateDailyLog({ ...payload, cat_id: catID });
    } else {
      createDailyLog({ cat_id: catID, ...payload });
    }
  };

  if (logID && isLoading) {
    return <Spinner size="lg" className="mx-auto" />;
  }

  const savedLog = logID ? (dailyLog?.[0] as DailyLog | undefined) : undefined;
  const medicationDefault = isMedicationBrand(savedLog?.medication_name)
    ? savedLog.medication_name
    : undefined;

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
            You can add one daily log per day. If today already has a log, open
            that row and update it.
          </p>
        </div>
      )}
      <Form
        schema={dailyLogsSchema}
        onSubmit={handleSubmit}
        options={{
          defaultValues: {
            dose: savedLog?.dose ?? '',
            weight: savedLog?.weight != null ? String(savedLog.weight) : '',
            medication_name: medicationDefault,
            note: savedLog?.note ?? '',
          },
        }}
      >
        {({ register, formState, control }) => {
          return (
            <>
              {logID && (
                <p className="text-sm">
                  Day <span className="font-semibold">{savedLog?.day}</span>
                </p>
              )}

              <Input
                registration={register('dose')}
                type="text"
                pattern="[0-9]+([\.,][0-9]+)?"
                placeholder="Dose in ml"
                error={formState.errors['dose']}
              />

              <Input
                registration={register('weight')}
                type="text"
                pattern="[0-9]+([\.,][0-9]+)?"
                placeholder="Weight in kg"
                error={formState.errors['weight']}
                step="0.01"
              />

              <Controller
                control={control}
                name="medication_name"
                render={({ field, fieldState }) => (
                  <FieldWrapper label="Medication" error={fieldState.error}>
                    <Select
                      value={field.value ?? ''}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="text-inherit">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent portalled={false} className="z-[200]">
                        <SelectItem value="GS-15">GS-15</SelectItem>
                        <SelectItem value="GS-20">GS-20</SelectItem>
                        <SelectItem value="GS-30">GS-30</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldWrapper>
                )}
              />

              <Textarea
                className="resize-none"
                placeholder="Enter today's symptoms"
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
