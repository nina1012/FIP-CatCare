import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/common/badge';
import { Button } from '@/components/ui/common/button';

export const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-10 p-20 md:flex-row md:gap-20">
      <div className="flex w-2/3 flex-col gap-6 text-center md:text-left">
        <div className="mx-auto inline-block w-fit rounded-3xl !bg-pink-200 p-1 !text-[10px] transition-all hover:ring-1 hover:ring-primary md:m-0">
          <Link to="/#feature" className="flex items-center gap-1 pr-2 ">
            <Badge
              variant="outline"
              className="pointer-events-none bg-white text-inherit"
            >
              new!
            </Badge>
            We&apos;re launching new features!{' '}
            <ArrowRightIcon className="text-primary" size={10} />
          </Link>
        </div>
        <h1 className="text-6xl">
          Track Your Cat&apos;s
          <span className="text-primary"> FIP </span>Treatment Easily
        </h1>
        <p className="mx-auto w-2/3 md:mx-0">
          All the tools you need to monitor, manage, and analyze your cat&apos;s
          FIP treatment progress, helping you stay informed and proactive every
          step of the way
        </p>
        <div className="mx-auto flex gap-4 md:mx-0 [&>button]:w-1/3">
          <Button variant="outline">
            <Link to="/auth/register" className="">
              Create an account
            </Link>
          </Button>
          <Button>
            <Link to="/auth/login" className="">
              Log in
            </Link>
          </Button>
        </div>
      </div>
      <div className="w-1/3">
        <img
          src="./src/features/landing/assets/illustration.svg"
          alt="illustration"
          className="block !size-full object-contain"
        />
      </div>
    </div>
  );
};
