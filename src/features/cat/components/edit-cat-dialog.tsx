import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog/dialog';
import { DialogTriggerCard } from '@/components/ui/dialog/dialog-trigger-card';

import { Cat } from '../types';

import { RegisterCatForm } from './register-cat-form';

type EditCatDialogProps = {
  cat?: Cat | null;
};

export const EditCatDialog = ({ cat }: EditCatDialogProps) => {
  if (!cat) return null;

  return (
    // <div className="min-h-full min-w-full border-2">
    <Dialog>
      <DialogTriggerCard cat={cat} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {cat.name}</DialogTitle>
          <DialogDescription>
            <RegisterCatForm onSuccess={() => console.log('test')} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    // </div>
  );
};
