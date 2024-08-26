import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog/dialog';
import { DialogTriggerCard } from '@/components/ui/dialog/dialog-trigger-card';

import { Cat } from '../types';

import { EditCatForm } from './edit-cat-form';

type EditCatDialogProps = {
  cat?: Cat | null;
};

export const EditCatDialog = ({ cat }: EditCatDialogProps) => {
  if (!cat) return null;

  return (
    <Dialog>
      <DialogTriggerCard cat={cat} />
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <EditCatForm cat={cat} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
