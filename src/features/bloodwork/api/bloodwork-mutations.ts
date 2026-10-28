import { useMutation } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';
import { deleteImage } from '@/utils/upload-image';

import { Bloodwork, BloodworkInput } from '../types';
import { LAB_REPORTS_BUCKET } from '../utils/lab-values';

import { invalidateBloodwork } from './invalidate-bloodwork';
import { BloodworkRow, normalizeBloodwork } from './normalize-bloodwork';
import { uploadLabReport } from './upload-lab-report';

type UseBloodworkMutationOptions = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const labValues = (input: BloodworkInput) => ({
  collected_on: input.collected_on,
  albumin_globulin_ratio: input.albumin_globulin_ratio,
  hematocrit: input.hematocrit,
  bilirubin: input.bilirubin,
});

const duplicateBloodworkMessage =
  'A bloodwork result already exists for that date. Open that row to update it.';

const bloodworkErrorMessage = (error: { code?: string; message: string }) =>
  error.code === '23505' ? duplicateBloodworkMessage : error.message;

export const createBloodworkFn = async (
  input: BloodworkInput,
): Promise<Bloodwork> => {
  const reportUrl = input.report ? await uploadLabReport(input.report) : null;

  const { data, error } = await supabase
    .from('bloodwork')
    .insert({
      cat_id: input.cat_id,
      ...labValues(input),
      report_url: reportUrl,
    })
    .select()
    .single();

  if (error) {
    throw new Error(bloodworkErrorMessage(error));
  }

  return normalizeBloodwork(data as BloodworkRow);
};

export const updateBloodworkFn = async (
  bloodworkID: string,
  input: BloodworkInput,
): Promise<Bloodwork> => {
  const reportUrl = input.report ? await uploadLabReport(input.report) : null;

  const { data, error } = await supabase
    .from('bloodwork')
    .update({
      ...labValues(input),
      updated_at: new Date().toISOString(),
      ...(reportUrl ? { report_url: reportUrl } : {}),
    })
    .eq('bloodwork_id', bloodworkID)
    .select()
    .single();

  if (error) {
    throw new Error(bloodworkErrorMessage(error));
  }

  if (reportUrl && input.previous_report_url) {
    try {
      await deleteImage({
        imageURL: input.previous_report_url,
        bucketName: LAB_REPORTS_BUCKET,
      });
    } catch {
      // the file is already deleted so it should not be deleted
    }
  }

  return normalizeBloodwork(data as BloodworkRow);
};

export const deleteBloodworkFn = async (
  bloodworkID: string,
): Promise<Bloodwork | null> => {
  const { data: existing, error: fetchError } = await supabase
    .from('bloodwork')
    .select('report_url')
    .eq('bloodwork_id', bloodworkID)
    .maybeSingle();

  if (fetchError) throw new Error(fetchError.message);

  const { data, error } = await supabase
    .from('bloodwork')
    .delete()
    .eq('bloodwork_id', bloodworkID)
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (existing?.report_url) {
    try {
      await deleteImage({
        imageURL: existing.report_url,
        bucketName: LAB_REPORTS_BUCKET,
      });
    } catch {
      // the row is already deleted so the file should not be delelleted
    }
  }

  return data ? normalizeBloodwork(data as BloodworkRow) : null;
};

const mutationErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export const useCreateBloodwork = ({
  onSuccess,
  onError,
}: UseBloodworkMutationOptions = {}) => {
  const { mutate: createBloodwork, isPending } = useMutation({
    mutationFn: createBloodworkFn,
    onSuccess: () => {
      invalidateBloodwork();
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(mutationErrorMessage(error, 'Could not save bloodwork.'));
    },
  });

  return { createBloodwork, isPending };
};

export const useUpdateBloodwork = (
  bloodworkID: string,
  { onSuccess, onError }: UseBloodworkMutationOptions = {},
) => {
  const { mutate: updateBloodwork, isPending } = useMutation({
    mutationFn: (input: BloodworkInput) =>
      updateBloodworkFn(bloodworkID, input),
    onSuccess: () => {
      invalidateBloodwork();
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(mutationErrorMessage(error, 'Could not update bloodwork.'));
    },
  });

  return { updateBloodwork, isPending };
};

export const useDeleteBloodwork = ({
  onSuccess,
  onError,
}: UseBloodworkMutationOptions = {}) => {
  const { mutate: deleteBloodwork, isPending } = useMutation({
    mutationFn: deleteBloodworkFn,
    onSuccess: () => {
      invalidateBloodwork();
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(mutationErrorMessage(error, 'Could not delete bloodwork.'));
    },
  });

  return { deleteBloodwork, isPending };
};
