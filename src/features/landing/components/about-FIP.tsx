export const AboutFIP = () => {
  // bg-[#00968840]
  return (
    <section
      id="aboutFIP"
      className="my-4 flex flex-col gap-4 text-center md:text-left"
    >
      <div className="mx-auto text-lg text-neutral-700 ">
        <h2 className="my-8 text-center text-3xl font-semibold">
          What is FIP?
        </h2>
        <div className="mx-auto max-w-3xl text-center text-lg text-gray-700">
          <p>
            <a
              href="https://en.wikipedia.org/wiki/Feline_infectious_peritonitis"
              target="_blank"
              className="nav-link inline-block p-px !text-base text-primary transition-all hover:underline"
              rel="noreferrer"
            >
              Feline Infectious Peritonitis, (FIP)
            </a>{' '}
            is a viral disease of cats caused by certain strains of a virus
            called the feline coronavirus. FIP is a viral disease that can lead
            to severe illness if not treated early. Understanding the symptoms
            and monitoring progress is key to your cat&apos;s recovery.
          </p>
          <p>
            FIP is extremely fatal with an estimated mortality rate of ~96% if
            untreated.
          </p>
          <a
            className="my-4 inline-block rounded p-2 ring-1 ring-neutral-700 hover:text-primary hover:ring-primary"
            href="https://icatcare.org/app/uploads/2024/02/FIP-pet-owner-brochure-FINAL-V1-Feb-2024-A5-161.pdf"
          >
            Learn more
          </a>
        </div>
      </div>
      <div className="mx-auto text-lg text-neutral-700">
        <h3 className="my-8 text-center text-2xl font-semibold">
          3 stages of infection
        </h3>
        <div className="mx-auto max-w-3xl text-center text-lg text-gray-700">
          <p>
            FIP is caused by a mutated form of the feline coronavirus. Symptoms
            include lethargy, fever, weight loss, and difficulty breathing.
            Early detection is crucial to managing the disease.
          </p>
          <p>There are 3 main stages of FIP:</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 text-center lg:grid-cols-3">
          <div className="flex flex-col gap-4 rounded-md border-2 border-[#00968830] bg-[#00968830] p-4 ">
            <h5 className="text-3xl font-semibold">Early Stage</h5>
            <p className="text-lg">
              Intermittent fever, slight decrease in appetite, weight loss, and
              lethargy.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-md border-2 border-[#dfb02830] bg-[#dfb02830] p-4 ">
            <h5 className="text-3xl font-semibold">Mid Stage</h5>
            <p className="text-lg">
              Worsening of early stage symptoms + ascites, diarrhea, anemia,
              jaundice.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-md border-2 border-[#fcd5ef] bg-[#f8e5ef] p-4 ">
            <h5 className="text-3xl font-semibold">Late Stage</h5>
            <p className="text-lg">
              Worsening of mid stage symptoms + Stopped feeding, cloudy eyes,
              loss of coordination, paralysis, and convulsions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
