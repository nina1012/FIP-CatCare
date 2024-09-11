import { Calculator } from 'lucide-react';

import { CalculateDosageForm } from '@/components/ui/calculator/calculate-dosage-form';
import { CustomTabContent } from '@/components/ui/tabs/custom-tab-content';

export const DosageCalcRoute = () => {
  return (
    <div className="container flex justify-between">
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold">Dosage Calculator</h2>
        <p className="max-w-xl">
          We offer GS-441524 in three concentrations: 15 mg, 20 mg, and 30 mg.
          As your cat recovers, it will start to gain weight. Monitoring
          progress in recovery is important. You should weigh your cat every
          week and adjust the medication dose using this calculator to match the
          current weight. It is important not to reduce the dose during
          treatment as such action can significantly increase the risk of
          recurrence in the future. For injections, we recommend using a 2 ml
          syringe with a 21 or 23 gauge needle, 2.5 cm long.
        </p>
        <p></p>
        <CustomTabContent
          label="calculate daily dosage"
          formComponent={<CalculateDosageForm />}
          icon={<Calculator />}
        ></CustomTabContent>
      </div>
    </div>
  );
};
