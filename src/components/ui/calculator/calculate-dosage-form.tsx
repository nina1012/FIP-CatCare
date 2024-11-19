import { useState } from 'react';

import { Label } from '@/components/ui/form/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/form/radio-group';
import { calculateDosage, FIPType } from '@/utils/calculate-dosage';

import { DialogTitle } from '../dialog/dialog';

export const CalculateDosageForm = () => {
  const [fipType, setFipType] = useState('wet');
  const [concentration, setConcentration] = useState(15);
  const [weight, setWeight] = useState(0);
  const [dailyDose, setDailyDose] = useState(0);

  const handleCalculate = () => {
    const dosage = FIPType(fipType);
    const dose = calculateDosage(weight, dosage, concentration);
    setDailyDose(dose);
  };

  return (
    <>
      <DialogTitle className="text-lg">Dosage calculator</DialogTitle>
      <form
        className="my-4 flex flex-col items-start gap-8"
        onChange={handleCalculate}
      >
        {/* TYPE OF FIP */}
        <RadioGroup
          aria-roledescription="fip-type"
          defaultValue="wet"
          onValueChange={(value) => setFipType(value)}
        >
          <h4 className="mb-2 font-semibold">Type of FIP:</h4>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="wet" id="wet" />
            <Label htmlFor="wet">Wet FIP 6mg/kg</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dry" id="dry" />
            <Label htmlFor="dry">Dry FIP 8mg/kg</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ocular" id="ocular" />
            <Label htmlFor="ocular">Ocular FIP 10mg/kg</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="neurological" id="neurological" />
            <Label htmlFor="neurological">Neurological FIP 10mg/kg</Label>
          </div>
        </RadioGroup>

        {/* CONCENTRATION */}
        <RadioGroup
          defaultValue="15"
          aria-roledescription="concentration"
          onValueChange={(value) => setConcentration(Number(value))}
        >
          <h4 className="mb-2 font-semibold">Concentration:</h4>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="15" id="15" />
            <Label htmlFor="15">15mg/ml</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="20" id="20" />
            <Label htmlFor="20">20mg/ml</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="30" id="30" />
            <Label htmlFor="30">30mg/ml</Label>
          </div>
        </RadioGroup>

        {/* WEIGHT */}
        <div>
          <h4 className="font-semibold">Cat&apos;s weight (kg):</h4>
          <input
            aria-roledescription="weight"
            className="w-full rounded border border-gray-400 p-2"
            type="string"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            placeholder="Enter weight in kg"
          />
        </div>

        <div>
          <h3 className="font-semibold">Daily Dose Required</h3>
          <div className="text-primary font-bold">
            {dailyDose.toFixed(2)} ml
          </div>
        </div>
      </form>
    </>
  );
};
