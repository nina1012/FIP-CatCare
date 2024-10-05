import { Features } from '@/features/landing/components/Features';
import { Header } from '@/features/landing/components/Header';
import { Hero } from '@/features/landing/components/Hero';

export const LandingRoute = () => {
  return (
    <div className="relative min-h-screen">
      <img
        className="absolute left-0 top-0 z-10 h-auto max-h-full opacity-60 sm:top-0 md:-left-1/4"
        src="/cute-pink-paws.png"
        alt="paws"
      />
      <div className="relative flex h-min w-full flex-none flex-col flex-nowrap items-center justify-start gap-0 overflow-visible bg-primary p-6">
        <Header />
        <div className="z-20 flex min-h-screen w-full flex-col bg-white pt-4 backdrop-opacity-35">
          {/* container for all the sections */}
          <div className="flex flex-col gap-10 p-20 md:gap-20">
            <Hero />
            <Features />
          </div>
        </div>
      </div>
    </div>
  );
};
