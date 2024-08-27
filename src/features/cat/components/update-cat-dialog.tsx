import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog/dialog';
import { DialogTriggerCard } from '@/components/ui/dialog/dialog-trigger-card';

import { Cat } from '../types';

import UpdateCatForm from './update-cat-form';

type UpdateCatDialogProps = {
  cat?: Cat | null;
};

export const UpdateCatDialog = ({ cat }: UpdateCatDialogProps) => {
  if (!cat) return null;

  return (
    <Dialog>
      <DialogTriggerCard cat={cat} />
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <UpdateCatForm cat={cat} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
