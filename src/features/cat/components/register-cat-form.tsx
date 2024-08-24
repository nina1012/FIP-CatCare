import { Info, Plus } from 'lucide-react';
import { z } from 'zod';

import { Button } from '@/components/ui/common/button';
import { Form, Input, Label } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/form/select';
import { useToast } from '@/components/ui/toast/use-toast';
import { useUser } from '@/features/auth/api/get-auth-user';
import { isFileList } from '@/utils/isFileList';

import { useRegisterCat } from '../api/register-new-cat';
import { Cat } from '../types';

const registrationCatSchema = z.object({
  name: z.string().min(1, 'Required'),
  breed: z.string().optional().default('domestic'),
  age: z.string().min(1, 'Required'),
  color: z.string().min(1, "Please, provide cat's color"),
  cat_image_url: z.instanceof(FileList).optional(),
  weight: z.string().min(1, 'Required'),
});

type RegisterCatFormProps = {
  onSuccess: () => void;
};

export const RegisterCatForm = ({ onSuccess }: RegisterCatFormProps) => {
  const { user } = useUser();
  const { toast } = useToast();

  const { registerCat } = useRegisterCat({
    onSuccess: () => {
      toast({
        title: "Successful cat's registration",
        description: 'You have successfully added new cat 🐈',
      });
      onSuccess();
    },
    onError: (error: string) => {
      toast({
        title: "Unsuccessful cat's registration",
        description: error,
        variant: 'destructive',
      });
    },
  });

  if (!user) return null;

  return (
    <div>
      <h4 className="my-4 flex items-center gap-1 text-lg font-medium">
        Basic info <Info size={16} />
      </h4>
      <Form
        onSubmit={(values: Omit<Cat, 'cat_id' | 'user_id' | 'created_at'>) => {
          registerCat(values);
        }}
        schema={registrationCatSchema}
        className="max-w-md"
      >
        {({ register, formState, watch }) => {
          // setting preview avatar if user has selected their avatar image
          const selectedFile = watch('cat_image_url');
          const isFileSelected = selectedFile && selectedFile.length > 0;

          return (
            <>
              <Label
                htmlFor="cat_image_url"
                className="group relative mx-auto my-4 flex size-20 cursor-pointer flex-col items-center justify-center self-center rounded-[50%]  border-2"
              >
                <Plus className="absolute right-0 top-0 z-10 rounded-full border border-primary bg-background text-primary transition-all focus-within:text-white group-hover:bg-primary group-hover:text-white" />
                <Input
                  type="file"
                  registration={register('cat_image_url')}
                  className="hidden"
                  id="cat_image_url"
                />
                <div className="border-2">
                  <img
                    src={
                      isFileSelected && isFileList(selectedFile[0])
                        ? selectedFile[0] + ''
                        : '/cat-placeholder.jpg'
                    }
                    alt="Preview"
                    className="absolute inset-0 z-0 size-full rounded-full object-cover object-center"
                  />
                </div>
              </Label>
              <Input
                type="text"
                placeholder="Cat's name"
                error={formState.errors['name']}
                registration={register('name')}
              />
              <Input
                type="text"
                placeholder="Cat's breed"
                error={formState.errors['breed']}
                registration={register('breed')}
              />
              <Input
                type="string"
                placeholder="Cat's age"
                error={formState.errors['age']}
                registration={register('age')}
              />
              <Input
                type="text"
                placeholder="Cat's color"
                error={formState.errors['color']}
                registration={register('color')}
              />
              <Input
                type="text"
                placeholder="Cat's weight (in kg)"
                error={formState.errors['weight']}
                registration={register('weight')}
              />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="FIP Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wet">wet</SelectItem>
                  <SelectItem value="dry">dry</SelectItem>
                  <SelectItem value="ocular">ocular</SelectItem>
                  <SelectItem value="neurological">neurological</SelectItem>
                </SelectContent>
              </Select>
              <div>
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
};
