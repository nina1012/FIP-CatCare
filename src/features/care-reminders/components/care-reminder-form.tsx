import { Controller } from 'react-hook-form';
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

import {
  useCreateCareReminder,
  useUpdateCareReminder,
} from '../api/care-reminder-mutations';
import { CARE_REMINDER_KINDS, CareReminder, CareReminderKind } from '../types';
import { formatReminderDate, todayKey } from '../utils/dates';
import { CARE_REMINDER_META, suggestedDueOn } from '../utils/reminders';
import {
  SAMPLE_REMINDERS_MESSAGE,
  isSampleCareReminder,
} from '../utils/sample-reminders';

export const careReminderSchema = z.object({
  kind: z.enum(CARE_REMINDER_KINDS, {
    errorMap: () => ({ message: 'Choose a reminder type' }),
  }),
  due_on: z
    .string()
    .min(1, 'Choose a date')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Choose a valid date')
    .refine((value) => value >= todayKey(), 'Choose today or a future date'),
  notes: z.string().max(500, 'Keep the note under 500 characters').optional(),
});

type CareReminderFormValues = z.infer<typeof careReminderSchema>;

type CareReminderFormProps = {
  catID: string;
  reminder?: CareReminder | null;
  onSaved?: () => void;
};

const requestReminderPermission = () => {
  if (
    typeof Notification === 'undefined' ||
    Notification.permission !== 'default'
  ) {
    return;
  }
  void Notification.requestPermission();
};

export const CareReminderForm = ({
  catID,
  reminder,
  onSaved,
}: CareReminderFormProps) => {
  const { toast } = useToast();
  const isEditing = Boolean(reminder);
  const today = todayKey();

  const { createCareReminder, isPending: isCreating } = useCreateCareReminder({
    onSuccess: () => {
      toast({
        title: 'Reminder saved',
        description: 'You will be notified on the due date.',
      });
      requestReminderPermission();
      onSaved?.();
    },
    onError: (message) => {
      toast({
        title: 'Unsuccessful',
        description: message,
        variant: 'destructive',
      });
    },
  });

  const { updateCareReminder, isPending: isUpdating } = useUpdateCareReminder({
    onSuccess: () => {
      toast({
        title: 'Reminder updated',
        description: 'The date for this cat has been saved.',
      });
      onSaved?.();
    },
    onError: (message) => {
      toast({
        title: 'Unsuccessful',
        description: message,
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (values: CareReminderFormValues) => {
    const input = {
      cat_id: catID,
      kind: values.kind,
      due_on: values.due_on,
      notes: values.notes,
    };

    if (reminder && isSampleCareReminder(reminder.reminder_id)) {
      toast({
        title: 'Sample reminder',
        description: SAMPLE_REMINDERS_MESSAGE,
      });
      onSaved?.();
      return;
    }

    if (reminder) {
      updateCareReminder({ reminderID: reminder.reminder_id, input });
      return;
    }

    createCareReminder(input);
  };

  const isPending = isCreating || isUpdating;
  const initialKind = reminder?.kind ?? 'weigh_in';

  return (
    <div className="max-h-[70vh] overflow-y-auto pr-1">
      <DialogTitle className="mb-4">
        {isEditing ? 'Update reminder' : 'Schedule a reminder'}
      </DialogTitle>
      <DialogDescription className="text-primary">
        Weigh-ins are usually every week. Bloodwork and vet visits are every 4
        weeks during treatment and every 4 weeks after.
      </DialogDescription>
      <Form
        className="mt-4"
        schema={careReminderSchema}
        onSubmit={handleSubmit}
        options={{
          defaultValues: {
            kind: initialKind,
            due_on:
              reminder?.due_on ?? suggestedDueOn({ kind: initialKind, today }),
            notes: reminder?.notes ?? '',
          },
        }}
      >
        {({ register, formState, control, setValue, getValues, watch }) => {
          const selectedKind = watch('kind');
          const suggestion = suggestedDueOn({ kind: selectedKind, today });

          return (
            <>
              <Controller
                control={control}
                name="kind"
                render={({ field, fieldState }) => (
                  <FieldWrapper label="Reminder" error={fieldState.error}>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        const nextKind = value as CareReminderKind;
                        const currentDue = getValues('due_on');
                        const previousSuggestion = suggestedDueOn({
                          kind: field.value,
                          today,
                        });
                        field.onChange(nextKind);
                        if (!isEditing && currentDue === previousSuggestion) {
                          setValue(
                            'due_on',
                            suggestedDueOn({ kind: nextKind, today }),
                            {
                              shouldValidate: true,
                            },
                          );
                        }
                      }}
                    >
                      <SelectTrigger
                        className="text-inherit"
                        aria-label="Reminder type"
                      >
                        <SelectValue placeholder="Choose a reminder" />
                      </SelectTrigger>
                      <SelectContent portalled={false} className="z-[200]">
                        {CARE_REMINDER_KINDS.map((kind) => (
                          <SelectItem key={kind} value={kind}>
                            {CARE_REMINDER_META[kind].label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FieldWrapper>
                )}
              />
              <Input
                type="date"
                label="Due date"
                min={today}
                registration={register('due_on')}
                error={formState.errors.due_on}
              />
              <p className="text-xs text-muted-foreground">
                {CARE_REMINDER_META[selectedKind].label} is usually{' '}
                {CARE_REMINDER_META[selectedKind].cadence}. Suggested date:{' '}
                {formatReminderDate(suggestion)}.
              </p>
              <Textarea
                className="resize-none"
                label="Note"
                placeholder="Clinic, fasting or anything else to remember"
                registration={register('notes')}
              />
              {formState.errors.notes && (
                <p role="alert" className="text-xs font-semibold text-red-400">
                  {formState.errors.notes.message}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Spinner size="sm" className="mr-2 bg-white" />}
                {isEditing ? 'Update reminder' : 'Save reminder'}
              </Button>
            </>
          );
        }}
      </Form>
    </div>
  );
};
