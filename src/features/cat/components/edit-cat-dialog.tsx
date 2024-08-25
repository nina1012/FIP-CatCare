import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/common/dialog';

import { Cat } from '../types';

import { RegisterCatForm } from './register-cat-form';

type EditCatDialogProps = {
  cat?: Cat | null;
};

export const EditCatDialog = ({ cat }: EditCatDialogProps) => {
  if (!cat) return null;
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="h-full border-2">Edit cat&apos;s basic info</div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {cat.name}</DialogTitle>
            <DialogDescription>
              <RegisterCatForm onSuccess={() => console.log('test')} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
