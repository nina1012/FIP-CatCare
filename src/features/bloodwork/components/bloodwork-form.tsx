import { z } from 'zod';

import { Button } from '@/components/ui/common/button';
import { Spinner } from '@/components/ui/common/spinner';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog/dialog';
import { Form, Input } from '@/components/ui/form';
import { useToast } from '@/components/ui/toast/use-toast';

import {
  useCreateBloodwork,
  useUpdateBloodwork,
} from '../api/bloodwork-mutations';
import { useBloodworkResult } from '../api/get-bloodwork';
import { BloodworkInput } from '../types';
import { todayKey } from '../utils/dates';
import { labReportTypeError, LAB_REPORT_ACCEPT } from '../utils/lab-values';

const requiredLabNumber = ({
  label,
  min,
  max,
}: {
  label: string;
  min: number;
  max: number;
}) =>
  z
    .string()
    .trim()
    .min(1, `Enter ${label}`)
    .refine((value) => {
      const parsed = Number(value.replace(',', '.'));
      return Number.isFinite(parsed) && parsed >= min && parsed <= max;
    }, `Enter ${label} between ${min} and ${max}`);

const bloodworkSchema = z.object({
  collected_on: z
    .string()
    .min(1, 'Choose the collection date')
    .refine(
      (value) => value <= todayKey(),
      'Collection date cannot be in the future',
    ),
  albumin_globulin_ratio: requiredLabNumber({
    label: 'the albumin/globulin ratio',
    min: 0,
    max: 3,
  }),
  hematocrit: requiredLabNumber({ label: 'hematocrit', min: 0, max: 100 }),
  bilirubin: requiredLabNumber({ label: 'bilirubin', min: 0, max: 50 }),
  report: z
    .custom<FileList>(
      (value) => value == null || value instanceof FileList,
      'Attach a lab report file',
    )
    .optional()
    .refine((files) => {
      const file = files?.item(0);
      return !file || labReportTypeError(file) == null;
    }, 'Attach a JPEG, PNG, WEBP, GIF, or PDF up to 10 MB'),
});

type BloodworkFormValues = z.infer<typeof bloodworkSchema>;

const parseLabInput = (value: string) => Number(value.replace(',', '.'));

type BloodworkFormProps = {
  catID: string;
  bloodworkID?: string | null;
};

export const BloodworkForm = ({ catID, bloodworkID }: BloodworkFormProps) => {
  const { toast } = useToast();
  const isEditing = Boolean(bloodworkID);
  const { result, isLoadingResult, resultError } =
    useBloodworkResult(bloodworkID);

  const { createBloodwork, isPending: isCreating } = useCreateBloodwork({
    onSuccess: () => {
      toast({
        title: 'Successful',
        description: 'Bloodwork result saved.',
      });
    },
    onError: (message) => {
      toast({
        title: 'Unsuccessful',
        description: message,
        variant: 'destructive',
      });
    },
  });

  const { updateBloodwork, isPending: isUpdating } = useUpdateBloodwork(
    bloodworkID ?? '',
    {
      onSuccess: () => {
        toast({
          title: 'Successful',
          description: 'Bloodwork result updated.',
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

  if (isEditing && isLoadingResult) {
    return <Spinner size="lg" className="mx-auto" />;
  }

  if (isEditing && resultError) {
    return (
      <p role="alert" className="text-sm text-red-500">
        Could not load this bloodwork result.
      </p>
    );
  }

  const handleSubmit = (values: BloodworkFormValues) => {
    const report = values.report?.item(0) ?? null;
    const payload: BloodworkInput = {
      cat_id: catID,
      collected_on: values.collected_on,
      albumin_globulin_ratio: parseLabInput(values.albumin_globulin_ratio),
      hematocrit: parseLabInput(values.hematocrit),
      bilirubin: parseLabInput(values.bilirubin),
      report,
      previous_report_url: result?.report_url,
    };

    if (bloodworkID) {
      updateBloodwork(payload);
    } else {
      createBloodwork(payload);
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <div className="max-h-[70vh] overflow-y-auto pr-1">
      <DialogTitle className="mb-4">
        {isEditing ? 'Update bloodwork' : 'Add bloodwork'}
      </DialogTitle>
      <DialogDescription className="text-primary">
        Record the labs that matter for FIP and attach the report.
      </DialogDescription>
      <p className="my-4 rounded-sm border border-[#1f8caf] bg-[#1f8caf]/10 p-2 text-xs">
        Albumin/globulin ratio, hematocrit and bilirubin are usually checked at
        the start of treatment and about every 4 weeks after that.
      </p>
      <Form
        schema={bloodworkSchema}
        onSubmit={handleSubmit}
        options={{
          defaultValues: {
            collected_on: result?.collected_on ?? todayKey(),
            albumin_globulin_ratio:
              result?.albumin_globulin_ratio != null
                ? String(result.albumin_globulin_ratio)
                : '',
            hematocrit:
              result?.hematocrit != null ? String(result.hematocrit) : '',
            bilirubin:
              result?.bilirubin != null ? String(result.bilirubin) : '',
          },
        }}
      >
        {({ register, formState, watch }) => {
          const selectedReport = watch('report')?.item(0);

          return (
            <>
              <Input
                type="date"
                label="Collection date"
                max={todayKey()}
                registration={register('collected_on')}
                error={formState.errors.collected_on}
              />
              <Input
                type="text"
                inputMode="decimal"
                label="Albumin/globulin ratio"
                placeholder="0.65"
                registration={register('albumin_globulin_ratio')}
                error={formState.errors.albumin_globulin_ratio}
              />
              <Input
                type="text"
                inputMode="decimal"
                label="Hematocrit (%)"
                placeholder="Hematocrit or PCV"
                registration={register('hematocrit')}
                error={formState.errors.hematocrit}
              />
              <Input
                type="text"
                inputMode="decimal"
                label="Bilirubin (mg/dL)"
                placeholder="Total bilirubin"
                registration={register('bilirubin')}
                error={formState.errors.bilirubin}
              />
              <Input
                type="file"
                accept={LAB_REPORT_ACCEPT}
                label="Lab report"
                registration={register('report')}
                error={formState.errors.report}
              />
              <p className="text-xs text-muted-foreground">
                JPEG, PNG, WEBP, GIF, or PDF, up to 10 MB.
                {isEditing
                  ? ' Leave this empty to keep the current report.'
                  : ''}
              </p>
              {selectedReport && (
                <p className="text-xs">Selected: {selectedReport.name}</p>
              )}
              {result?.report_url && (
                <a
                  href={result.report_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-primary underline"
                >
                  View current lab report
                </a>
              )}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Spinner size="sm" className="mr-2 bg-white" />}
                {isEditing ? 'Update bloodwork' : 'Add bloodwork'}
              </Button>
            </>
          );
        }}
      </Form>
    </div>
  );
};
