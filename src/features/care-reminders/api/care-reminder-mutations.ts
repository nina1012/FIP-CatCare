import { useMutation } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

import {
  CareReminder,
  CareReminderInput,
  CompleteCareReminderResult,
} from '../types';
import { nextDueOn } from '../utils/reminders';

import { invalidateCareReminders } from './invalidate-care-reminders';
import {
  CareReminderRow,
  normalizeCareReminder,
} from './normalize-care-reminder';

type MutationOptions<T> = {
  onSuccess?: (result: T) => void;
  onError?: (error: string) => void;
};

const duplicateReminderMessage =
  'A reminder of that type is already scheduled on that date.';

const reminderErrorMessage = (error: { code?: string; message: string }) =>
  error.code === '23505' ? duplicateReminderMessage : error.message;

const errorMessage = ({
  error,
  fallback,
}: {
  error: unknown;
  fallback: string;
}) => (error instanceof Error ? error.message : fallback);

const requireUserId = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    throw new Error('Sign in to save a reminder.');
  }
  return data.user.id;
};

const notesValue = (notes?: string | null) => {
  const trimmed = notes?.trim();
  return trimmed ? trimmed : null;
};

export const createCareReminderFn = async (
  input: CareReminderInput,
): Promise<CareReminder> => {
  const userId = await requireUserId();

  const { data, error } = await supabase
    .from('care_reminders')
    .insert({
      cat_id: input.cat_id,
      user_id: userId,
      kind: input.kind,
      due_on: input.due_on,
      notes: notesValue(input.notes),
    })
    .select()
    .single();

  if (error) {
    throw new Error(reminderErrorMessage(error));
  }
  return normalizeCareReminder(data as CareReminderRow);
};

export const updateCareReminderFn = async ({
  reminderID,
  input,
}: {
  reminderID: string;
  input: CareReminderInput;
}): Promise<CareReminder> => {
  const { data, error } = await supabase
    .from('care_reminders')
    .update({
      kind: input.kind,
      due_on: input.due_on,
      notes: notesValue(input.notes),
      updated_at: new Date().toISOString(),
    })
    .eq('reminder_id', reminderID)
    .select()
    .single();

  if (error) {
    throw new Error(reminderErrorMessage(error));
  }
  return normalizeCareReminder(data as CareReminderRow);
};

export const completeCareReminderFn = async ({
  reminder,
  scheduleNext,
}: {
  reminder: CareReminder;
  scheduleNext: boolean;
}): Promise<CompleteCareReminderResult> => {
  const completedAt = new Date().toISOString();
  const { data, error } = await supabase
    .from('care_reminders')
    .update({
      completed_at: completedAt,
      updated_at: completedAt,
    })
    .eq('reminder_id', reminder.reminder_id)
    .is('completed_at', null)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error('This reminder is already done.');
  }

  const completed = normalizeCareReminder(data as CareReminderRow);

  if (!scheduleNext) {
    return {
      completed,
      next: null,
      nextAlreadyScheduled: false,
      nextError: null,
    };
  }

  try {
    const next = await createCareReminderFn({
      cat_id: reminder.cat_id,
      kind: reminder.kind,
      due_on: nextDueOn({ dueOn: reminder.due_on, kind: reminder.kind }),
      notes: null,
    });
    return {
      completed,
      next,
      nextAlreadyScheduled: false,
      nextError: null,
    };
  } catch (nextFailure) {
    const message = errorMessage({
      error: nextFailure,
      fallback: 'The next reminder could not be scheduled.',
    });
    if (message === duplicateReminderMessage) {
      return {
        completed,
        next: null,
        nextAlreadyScheduled: true,
        nextError: null,
      };
    }
    return {
      completed,
      next: null,
      nextAlreadyScheduled: false,
      nextError: message,
    };
  }
};

export const deleteCareReminderFn = async (
  reminderID: string,
): Promise<void> => {
  const { error } = await supabase
    .from('care_reminders')
    .delete()
    .eq('reminder_id', reminderID);

  if (error) {
    throw new Error(error.message);
  }
};

export const useCreateCareReminder = ({
  onSuccess,
  onError,
}: MutationOptions<CareReminder> = {}) => {
  const { mutate: createCareReminder, isPending } = useMutation({
    mutationFn: createCareReminderFn,
    onSuccess: (result) => {
      invalidateCareReminders();
      onSuccess?.(result);
    },
    onError: (error) => {
      onError?.(
        errorMessage({ error, fallback: 'Could not save the reminder.' }),
      );
    },
  });

  return { createCareReminder, isPending };
};

export const useUpdateCareReminder = ({
  onSuccess,
  onError,
}: MutationOptions<CareReminder> = {}) => {
  const { mutate: updateCareReminder, isPending } = useMutation({
    mutationFn: updateCareReminderFn,
    onSuccess: (result) => {
      invalidateCareReminders();
      onSuccess?.(result);
    },
    onError: (error) => {
      onError?.(
        errorMessage({ error, fallback: 'Could not update the reminder.' }),
      );
    },
  });

  return { updateCareReminder, isPending };
};

export const useCompleteCareReminder = ({
  onSuccess,
  onError,
}: MutationOptions<CompleteCareReminderResult> = {}) => {
  const { mutate: completeCareReminder, isPending } = useMutation({
    mutationFn: completeCareReminderFn,
    onSuccess: (result) => {
      invalidateCareReminders();
      onSuccess?.(result);
    },
    onError: (error) => {
      onError?.(
        errorMessage({ error, fallback: 'Could not complete the reminder.' }),
      );
    },
  });

  return { completeCareReminder, isPending };
};

export const useDeleteCareReminder = ({
  onSuccess,
  onError,
}: MutationOptions<string> = {}) => {
  const { mutate: deleteCareReminder, isPending } = useMutation({
    mutationFn: deleteCareReminderFn,
    onSuccess: (_result, reminderID) => {
      invalidateCareReminders();
      onSuccess?.(reminderID);
    },
    onError: (error) => {
      onError?.(
        errorMessage({ error, fallback: 'Could not delete the reminder.' }),
      );
    },
  });

  return { deleteCareReminder, isPending };
};
