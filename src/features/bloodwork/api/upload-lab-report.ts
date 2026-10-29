import { uploadImage } from '@/utils/upload-image';

import { LAB_REPORTS_BUCKET, labReportTypeError } from '../utils/lab-values';

export const uploadLabReport = async (file: File): Promise<string> => {
  const typeError = labReportTypeError(file);
  if (typeError) {
    throw new Error(typeError);
  }

  const extension =
    file.type === 'application/pdf' ? 'pdf' : file.type.split('/')[1];
  const imageName = `lab_report_${Date.now()}.${extension}`;

  await uploadImage({
    image: file,
    imageName,
    bucketName: LAB_REPORTS_BUCKET,
  });

  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${LAB_REPORTS_BUCKET}/${imageName}`;
};
