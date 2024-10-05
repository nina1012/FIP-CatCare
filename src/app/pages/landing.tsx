import { Header } from '@/features/landing/components/Header';
import { Hero } from '@/features/landing/components/Hero';

export const LandingRoute = () => {
  return (
    <div className="relative min-h-screen">
      <img
        className="absolute left-0 top-0 z-10 h-auto max-h-full sm:top-0 md:bottom-1/2 md:right-0"
        src="/cute-pink-paws.png"
        alt="paws"
      />
      <div className="relative flex h-min w-full flex-none flex-col flex-nowrap items-center justify-start gap-0 overflow-visible bg-primary p-6">
        <Header />
        {/* container for all the sections */}
        <section className="z-20 flex min-h-screen w-full flex-col bg-white pt-4 backdrop-opacity-35">
          {/* subsection */}
          <div className="">
            <Hero />
          </div>
        </section>
      </div>
    </div>
  );
};
