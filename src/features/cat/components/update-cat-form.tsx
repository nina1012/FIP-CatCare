import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/common/button';
import { DialogTitle } from '@/components/ui/dialog/dialog';
import { Form, Input, Label } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/form/select';
import { isFileList } from '@/utils/isFileList';

import { useUpdateCatData } from '../api/update-cat-data';
import { Cat } from '../types';

import { formCatSchema } from './register-cat-form';

export type UpdateCatFormProps = {
  cat: Cat;
};

export const UpdateCatForm = ({ cat }: UpdateCatFormProps) => {
  const { updateCat } = useUpdateCatData(cat.cat_id);

  return (
    <div>
      <Form
        onSubmit={(values) => {
          let imageUrl;
          // if user didn't update info, keep the old cat_image_url
          if (values.cat_image_url && values.cat_image_url.length === 0) {
            imageUrl = cat?.cat_image_url;
          }
          updateCat({
            cat_image_url: values.cat_image_url
              ? values.cat_image_url
              : imageUrl,
            name: values.name,
            breed: values.breed,
            age: values.age,
            color: values.color,
            weight: +values.weight,
          });
        }}
        schema={formCatSchema}
      >
        {({ register, formState, watch }) => {
          const selectedFile = watch('cat_image_url');
          const isFileSelected = selectedFile && selectedFile.length > 0;
          return (
            <>
              <DialogTitle>Edit {cat.name}</DialogTitle>
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
                        : (cat.cat_image_url as string)
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
                defaultValue={cat.name}
              />
              <Input
                type="text"
                placeholder="Cat's breed"
                error={formState.errors['breed']}
                registration={register('breed')}
                defaultValue={cat.breed}
              />
              <Input
                type="string"
                placeholder="Cat's age"
                error={formState.errors['age']}
                registration={register('age')}
                defaultValue={cat.age}
              />
              <Input
                type="text"
                placeholder="Cat's color"
                error={formState.errors['color']}
                registration={register('color')}
                defaultValue={cat.color}
              />
              <Input
                type="text"
                placeholder="Cat's weight (in kg)"
                error={formState.errors['weight']}
                registration={register('weight')}
                defaultValue={cat.weight}
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
                  Edit {cat.name}
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
};
