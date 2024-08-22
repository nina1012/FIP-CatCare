import { Info, Plus } from 'lucide-react';
import { z } from 'zod';

import { Button } from '@/components/ui/common/button';
import { Form, Input, Label } from '@/components/ui/form';

const registrationCatSchema = z.object({
  name: z.string().min(1, 'Required'),
  breed: z.string().optional().default('domestic'),
  age: z.string().min(1, "Please, provide cat's age"),
  color: z.string().min(1, "Please, provide cat's color"),
  image_url: z.instanceof(FileList).optional(),
});

export const RegisterCatForm = () => {
  return (
    <div>
      <h4 className="my-4 flex items-center gap-1 text-lg font-medium">
        Basic info <Info size={16} className="text-[#009688]" />
      </h4>
      <Form
        onSubmit={(values) => console.log(values)}
        schema={registrationCatSchema}
        className="max-w-md"
      >
        {({ register, formState, watch }) => {
          // setting preview avatar if user has selected their avatar image
          const selectedFile = watch('image_url');
          const isFileSelected = selectedFile && selectedFile.length > 0;
          return (
            <>
              <Label
                htmlFor="image_url"
                className="group relative mx-auto my-4 flex size-20 cursor-pointer flex-col items-center justify-center self-center rounded-[50%]  border-2"
              >
                <Plus className="absolute right-0 top-0 z-10 rounded-full border border-primary bg-background text-primary transition-all focus-within:text-white group-hover:bg-primary group-hover:text-white" />
                <Input
                  type="file"
                  registration={register('image_url')}
                  className="hidden"
                  id="image_url"
                />
                <div className="">
                  <img
                    src={
                      isFileSelected
                        ? URL.createObjectURL(selectedFile[0])
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
