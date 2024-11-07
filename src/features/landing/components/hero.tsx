import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/common/badge';
import { Button } from '@/components/ui/common/button';

export const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-evenly gap-8 lg:min-h-[400px] lg:flex-row lg:gap-8">
      <div className="flex flex-col gap-6 text-center md:text-left lg:w-1/2">
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
        <p className="mx-auto text-gray-600 md:mx-0">
          The only app you need to monitor, manage, and analyze your cat&apos;s
          FIP treatment progress, helping you stay informed and proactive every
          step of the way
        </p>
        <div className="mx-auto flex gap-4 md:mx-0 [&>button]:md:w-1/4">
          <Link to="/auth/register" className="">
            <Button variant="outline">Create an account</Button>
          </Link>
          <Link to="/auth/login" className="">
            <Button>Log in</Button>
          </Link>
        </div>
      </div>
      <div className="md:w-1/2">
        <img
          src="/landing-assets/illustration.svg"
          alt="illustration"
          className="block !size-full object-contain"
        />
      </div>
    </div>
  );
};
