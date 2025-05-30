import { AboutFIP } from '@/features/landing/components/about-FIP';
import { AppExplaination } from '@/features/landing/components/app-explaination';
import { FAQ } from '@/features/landing/components/faq';
import { Features } from '@/features/landing/components/features';
import { Footer } from '@/features/landing/components/footer';
import { Header } from '@/features/landing/components/header';
import { Hero } from '@/features/landing/components/hero';
import { SuccessStories } from '@/features/landing/components/success-stories';

export const LandingRoute = () => {
  return (
    <div className="relative min-h-screen">
      <img
        className="pointer-events-none absolute left-0 top-0 z-10 h-auto max-h-full opacity-60 sm:top-0 md:-left-1/4"
        src="/cute-pink-paws.png"
        alt="paws"
      />
      <div className="!2xl:text-lg bg-primary relative flex h-min w-full flex-none flex-col flex-nowrap items-center justify-start gap-0 overflow-visible p-3 !text-base md:p-6">
        <Header />
        <div className="z-20 flex min-h-screen w-full flex-col rounded-none bg-white pt-4 backdrop-opacity-35">
          <div className="flex flex-col gap-10 p-5 md:px-20 lg:gap-20">
            <Hero />
            <AboutFIP />
            <AppExplaination />
            <Features />
            <FAQ />
            <SuccessStories />
          </div>
        </div>
        <Footer />
      </div>
      <img
        className="pointer-events-none absolute inset-y-0 right-0 z-10 h-auto max-h-full opacity-60"
        src="/cute-pink-paws.png"
        alt="paws"
      />
    </div>
  );
};
