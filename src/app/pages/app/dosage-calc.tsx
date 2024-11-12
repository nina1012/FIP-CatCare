import { Calculator } from 'lucide-react';

import { CalculateDosageForm } from '@/components/ui/calculator/calculate-dosage-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/common/accordion';
import { CustomTabContent } from '@/components/ui/tabs/custom-tab-content';

export const DosageCalcRoute = () => {
  return (
    <div className="relative flex min-h-96 flex-col justify-center overflow-hidden sm:px-6 lg:px-8 lg:py-12">
      <img
        className="absolute left-0 top-0 z-0 h-auto max-h-full opacity-20 sm:top-0 md:left-1/2"
        src="/cute-pink-paws.png"
        alt="paws"
      />
      <div className="container z-10 flex w-full flex-col justify-between md:gap-4 lg:flex-row lg:gap-8">
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-semibold">Dosage Calculator</h2>
          <p className="max-w-xl">
            We offer GS-441524 in three concentrations: 15 mg, 20 mg, and 30 mg.
            As your cat recovers, it will start to gain weight. Monitoring
            progress in recovery is important. You should weigh your cat every
            week and adjust the medication dose using this calculator to match
            the current weight. It is important not to reduce the dose during
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
        {/* FAQ and accordion */}
        <div className="my-12 lg:my-0 lg:w-1/2">
          <h2 className="my-4 text-2xl font-semibold">GS-441524 FAQs</h2>
          <Accordion type="single" collapsible className="max-w-xl">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Should I store the GS-441524 in the fridge?
              </AccordionTrigger>
              <AccordionContent>
                GS doesn&apos;t need to be stored in the fridge. It needs to be
                kept away from heat and light. Ideally in a cupboard or drawer.{' '}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I calculate my dosage?</AccordionTrigger>
              <AccordionContent>
                Your treatment advisory team will give you the calculation to
                use for calculating the correct dose for your kitty based on
                kitty&apos;s weight, GS dosage and the brand&apos;s
                concentration.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What will the dosage for pills be?
              </AccordionTrigger>
              <AccordionContent>
                Unless your treatment advisor has recommended increasing dosage
                the dosage will remain the same with pills as you started with
                for injections.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                How often do I have to weigh my cat?
              </AccordionTrigger>
              <AccordionContent>
                Weighing two times a week is recommended and even more often if
                they are kittens.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
