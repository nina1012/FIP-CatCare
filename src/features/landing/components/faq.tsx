import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/common/accordion';

export const FAQ = () => {
  const faq = [
    {
      trigger: 'What is FIP?',
      content:
        'FIP, or Feline Infectious Peritonitis, is a serious disease caused by a mutation of the feline coronavirus. It primarily affects cats’ immune systems and can lead to severe symptoms such as fever, lethargy, weight loss, and fluid buildup in the abdomen or chest.',
    },
    {
      trigger: 'How is FIP treated?',
      content:
        'FIP treatment has advanced significantly, and antivirals like GS-441524 have shown promising results. Treatment typically involves administering medication over several weeks under veterinary guidance. Early diagnosis and consistent treatment are critical for success.',
    },
    {
      trigger: 'Is the treatment for FIP effective?',
      content:
        "Many cats treated with modern antiviral medications have made full recoveries. Success depends on factors like the stage of the disease, the cat's overall health, and adherence to the treatment protocol.",
    },
    {
      trigger: 'Does your application provide medical advice or medication?',
      content:
        "No, my application does not provide medical advice, prescribe medications, or diagnose conditions. It is a resource to help cat owners understand FIP better, connect with supportive communities, and track their pet's progress during treatment.",
    },
    {
      trigger: 'Who can use the chatbot in your application?',
      content:
        'Currently, the chatbot is under development and will soon be available to registered users. It is designed to provide general information about FIP, answer common questions, and guide users to trusted resources.',
    },
    {
      trigger: 'Can I ask the chatbot non-FIP-related questions?',
      content:
        'The chatbot is specifically tailored to address FIP-related topics to provide focused and relevant support. For other inquiries, I recommend consulting your veterinarian.',
    },
    {
      trigger: 'Is the application free to use?',
      content: 'Yes, the basic features of the application are free.',
    },
    {
      trigger: 'Do I need to register to use the application?',
      content:
        'Yes, registration ensures a secure and personalized experience. It also allows us to provide tailored features like progress tracking and access to the chatbot.',
    },
    {
      trigger: 'Is the information in the app verified?',
      content:
        'Yes, I work hard to ensure that the information is accurate and sourced from trusted veterinary experts and organizations. However, it is not a substitute for professional veterinary advice. Always consult your vet for specific medical concerns.',
    },
  ];
  return (
    <section id="faq" className="">
      <div className="my-12 lg:my-0">
        <div className="">
          <h2 className="mb-3 text-center text-4xl font-bold">FAQ</h2>
          <p className="mx-auto max-w-3xl text-center text-gray-700">
            Some of the frequently asked questions
          </p>
        </div>
        <Accordion type="multiple" className="mx-auto mt-4 max-w-3xl">
          {faq.map((FAQ, i) => (
            <AccordionItem key={FAQ.trigger} value={`item-${i}`}>
              <AccordionTrigger className="font-bold text-primary">
                {FAQ.trigger}
              </AccordionTrigger>
              <AccordionContent>{FAQ.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
