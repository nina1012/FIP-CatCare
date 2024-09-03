import { Cat as CatIcon, Clock, Shield, User, Weight } from 'lucide-react';

import { Cat } from '@/features/cat/types';

import { DialogTrigger } from './dialog';

export const DialogTriggerCard = ({ cat }: { cat: Cat }) => {
  return (
    <DialogTrigger className="size-full rounded-md bg-[#f8e5ef]/70 p-4 shadow-md transition-all hover:shadow-sm hover:ring-1 hover:ring-primary">
      <div className="grid h-full gap-2">
        <h4 className="text-left font-bold">Basic cat&apos;s info</h4>
        <div className="flex items-center gap-2">
          <User />
          {cat.name}
        </div>
        <div className="flex items-center gap-2">
          <Clock />
          {cat.age} years old
        </div>
        <div className="flex items-center gap-2">
          <CatIcon />
          {cat.breed}
        </div>
        <div className="flex items-center gap-2">
          <Weight />
          {cat.weight.toFixed(3)} kg
        </div>
        <div className="flex items-center gap-2">
          <Shield />
          wet FIP
        </div>
      </div>
    </DialogTrigger>
  );
};
