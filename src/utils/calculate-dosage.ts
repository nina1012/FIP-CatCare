export const calculateDosage = (
  weight: number,
  dosage: number,
  concetration: number,
): number => {
  return (weight * dosage) / concetration;
};

// based on FIP type, find the dosage per kg
export const FIPType = (type: string) => {
  if (type === 'wet') {
    return 6;
  }
  if (type === 'dry') {
    return 8;
  }
  return 10;
};
