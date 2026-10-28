import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

import { Bloodwork } from '../types';

import { BloodworkRow, normalizeBloodwork } from './normalize-bloodwork';

export const getBloodworkFn = async (
  catID: string,
  page: number,
  rowsPerPage: number,
): Promise<{ data: Bloodwork[]; totalCount: number }> => {
  const from = page * rowsPerPage;
  const to = from + rowsPerPage - 1;

  const { data, error, count } = await supabase
    .from('bloodwork')
    .select('*', { count: 'exact' })
    .eq('cat_id', catID)
    .order('collected_on', { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  return {
    data: ((data ?? []) as BloodworkRow[]).map(normalizeBloodwork),
    totalCount: count ?? 0,
  };
};

export const useBloodwork = (
  catID: string,
  page: number,
  rowsPerPage: number,
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['bloodwork', catID, page, rowsPerPage],
    queryFn: () => getBloodworkFn(catID, page, rowsPerPage),
    placeholderData: keepPreviousData,
    enabled: Boolean(catID),
  });

  return {
    bloodwork: data?.data ?? [],
    isLoadingBloodwork: isLoading,
    bloodworkError: error,
    totalCount: data?.totalCount ?? 0,
  };
};

export const getAllBloodworkFn = async (
  catID: string,
): Promise<Bloodwork[]> => {
  const { data, error } = await supabase
    .from('bloodwork')
    .select('*')
    .eq('cat_id', catID)
    .order('collected_on', { ascending: true });

  if (error) throw new Error(error.message);

  return ((data ?? []) as BloodworkRow[]).map(normalizeBloodwork);
};

export const useAllBloodwork = (catID: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['all-bloodwork', catID],
    queryFn: () => getAllBloodworkFn(catID),
    enabled: Boolean(catID),
  });

  return {
    allBloodwork: data ?? [],
    isLoadingAllBloodwork: isLoading,
    allBloodworkError: error,
  };
};

export const getBloodworkResultFn = async (
  bloodworkID: string,
): Promise<Bloodwork | null> => {
  const { data, error } = await supabase
    .from('bloodwork')
    .select('*')
    .eq('bloodwork_id', bloodworkID)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? normalizeBloodwork(data as BloodworkRow) : null;
};

export const useBloodworkResult = (bloodworkID?: string | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['bloodwork-result', bloodworkID],
    queryFn: () => getBloodworkResultFn(bloodworkID as string),
    enabled: Boolean(bloodworkID),
  });

  return {
    result: data ?? null,
    isLoadingResult: isLoading,
    resultError: error,
  };
};
