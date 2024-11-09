import { Link } from 'react-router-dom';

export const AppExplaination = () => {
  return (
    <section className="my-4 flex flex-col gap-4 text-center md:text-left">
      <div className="mx-auto text-lg text-neutral-700">
        <h2 className="my-8 text-center text-3xl font-semibold">
          How Our App Helps You and Your Cat
        </h2>
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-8">
          <div className="flex min-w-96 flex-col gap-6 text-center text-xl text-gray-700 lg:w-2/3 lg:max-w-2xl lg:text-left">
            <Link
              to="/"
              className="hidden items-center justify-center gap-2 font-bold md:flex lg:justify-start"
            >
              <img
                src="/landing-assets/cat-medication.png"
                className="h-auto max-h-16"
                alt="FIP CatCare"
              />
              <h1 className="text-4xl">FIP CatCare </h1>
            </Link>
            <p>
              <strong>FIP CatCare App</strong> is designed to make managing FIP
              treatment and monitoring your cat&apos;s progress easier and
              stress-free. With powerful tracking tools and reminders, it helps
              you stay on top of your cat&apos;s health journey.
            </p>
            <p>
              <a
                className="nav-link inline-block p-px !text-base text-primary transition-all hover:underline"
                href="https://en.wikipedia.org/wiki/GS-441524"
                target="_blank"
                rel="noreferrer"
              >
                GS-441524
              </a>{' '}
              is an antiviral medication used in the treatment of Feline
              Infectious Peritonitis (FIP). It has shown promising results in
              helping cats recover from this once-fatal disease by targeting the
              virus responsible for FIP, supporting the cat&apos;s immune system
              in fighting the infection.
            </p>
            <p>
              This app is specifically designed to support cats undergoing FIP
              treatment with GS medication, helping pet owners track medication
              schedules, log daily health updates, and monitor progress
              throughout the treatment journey.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg">
            <img
              src="/landing-assets/phone.png"
              alt="Phone app"
              className="overflow-hidden rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
