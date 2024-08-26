import { Cat as CatIcon, Clock, Shield, User } from 'lucide-react';

import { Cat } from '@/features/cat/types';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../tooltip';

import { DialogTrigger } from './dialog';

export const DialogTriggerCard = ({ cat }: { cat: Cat }) => {
  console.log(cat);
  return (
    <DialogTrigger className="h-full rounded-md bg-[#f8e5ef]/70 p-4 shadow-md transition-all hover:shadow-sm hover:ring-1 hover:ring-primary">
      <div className="grid h-full">
        <h4 className="text-left font-bold">Basic cat&apos;s info</h4>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <User />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-primary">Account</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {cat.name}
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Clock />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-primary">Age</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {cat.age} years old
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CatIcon />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-primary">Breed</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {cat.breed}
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Shield />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-primary">FIP type</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          wet FIP
        </div>
      </div>
    </DialogTrigger>
  );
};
