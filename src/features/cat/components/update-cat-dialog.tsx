import { CatIcon, Clock, Shield, User, Weight } from 'lucide-react';

import { Card } from '@/components/ui/common/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/dialog';

import { Cat } from '../types';

import UpdateCatForm from './update-cat-form';

type UpdateCatDialogProps = {
  cat?: Cat | null;
};

export const UpdateCatDialog = ({ cat }: UpdateCatDialogProps) => {
  if (!cat) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card title="Basic cat's info" className="bg-[#f8e5ef]/70">
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
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {cat.name}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <UpdateCatForm cat={cat} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
